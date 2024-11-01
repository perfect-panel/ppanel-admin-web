FROM node:20-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --ignore-scripts; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY . .

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn standalone; \
  elif [ -f package-lock.json ]; then npm run standalone; \
  elif [ -f pnpm-lock.yaml ]; then pnpm standalone; \
  else npm run standalone; \
  fi

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG NEXT_PUBLIC_DEFAULT_LANGUAGE
ENV NEXT_PUBLIC_DEFAULT_LANGUAGE=${NEXT_PUBLIC_DEFAULT_LANGUAGE}

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG NEXT_PUBLIC_EMAIL
ENV NEXT_PUBLIC_EMAIL=${NEXT_PUBLIC_EMAIL}

ARG NEXT_PUBLIC_TELEGRAM_LINK
ENV NEXT_PUBLIC_TELEGRAM_LINK=${NEXT_PUBLIC_TELEGRAM_LINK}
ARG NEXT_PUBLIC_TWITTER_LINK
ENV NEXT_PUBLIC_TWITTER_LINK=${NEXT_PUBLIC_TWITTER_LINK}
ARG NEXT_PUBLIC_DISCORD_LINK
ENV NEXT_PUBLIC_DISCORD_LINK=${NEXT_PUBLIC_DISCORD_LINK}
ARG NEXT_PUBLIC_INSTAGRAM_LINK
ENV NEXT_PUBLIC_INSTAGRAM_LINK=${NEXT_PUBLIC_INSTAGRAM_LINK}
ARG NEXT_PUBLIC_LINKEDIN_LINK
ENV NEXT_PUBLIC_LINKEDIN_LINK=${NEXT_PUBLIC_LINKEDIN_LINK}
ARG NEXT_PUBLIC_GITHUB_LINK
ENV NEXT_PUBLIC_GITHUB_LINK=${NEXT_PUBLIC_GITHUB_LINK}

ARG NEXT_PUBLIC_DEFAULT_USER_EMAIL
ENV NEXT_PUBLIC_DEFAULT_USER_EMAIL=${NEXT_PUBLIC_DEFAULT_USER_EMAIL}
ARG NEXT_PUBLIC_DEFAULT_USER_PASSWORD
ENV NEXT_PUBLIC_DEFAULT_USER_PASSWORD=${NEXT_PUBLIC_DEFAULT_USER_PASSWORD}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]