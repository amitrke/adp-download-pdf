import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const config = {
  baseUrl: process.env.BASE_URL || 'https://my.adp.com',
  browser: process.env.SEL_BROWSER || 'firefox',
  userId: process.env.ADP_USER_ID || 'TestUser',
  password: process.env.ADP_USER_PSW || 'TestPass',
  folder: process.env.ADP_DOWNLOAD_FOLDER || 'download'
};

const argv:any = yargs(hideBin(process.argv)).argv
if (argv.userId) {
  config.userId = argv.userId;
}
if (argv.password) {
  config.password = argv.password;
}
if (argv.folder) {
  config.folder = argv.folder;
}
if (argv.browser) {
  config.browser = argv.browser;
}

export default config;
