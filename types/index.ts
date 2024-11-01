export interface NavItem {
  description?: string;
  disabled?: boolean;
  external?: boolean;
  href?: string;
  icon?: string;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  items: {
    external?: boolean;
    href: string;
    title: string;
  }[];
  title: string;
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
