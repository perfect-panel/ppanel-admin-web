const config = [
  {
    requestLibPath: "import request from '@/lib/request';",
    schemaPath: 'https://swagger.ppanel.dev/common.json',
    serversPath: './services',
    projectName: 'common',
  },
  {
    requestLibPath: "import request from '@/lib/request';",
    schemaPath: 'https://swagger.ppanel.dev/admin.json',
    serversPath: './services',
    projectName: 'admin',
  },
];

export default config;
