const config = {
  baseUrl: process.env.BASE_URL || 'https://my.adp.com',
  browser: process.env.SEL_BROWSER || 'safari',
  userId: process.env.ADP_USER_ID || 'TestUser',
  password: process.env.ADP_USER_PSW || 'TestPass'
};

export default config;
