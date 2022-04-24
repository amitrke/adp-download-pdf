import { HomePage } from './HomePage';
import { Browser } from '../lib';
import { LoginPage1 } from './LoginPage1';

export {
  HomePage,
};

export class AllPages {
    public home: HomePage;
    public loginPage1: LoginPage1;

    constructor(public browser: Browser) {
      this.home = new HomePage(browser);
      this.loginPage1 = new LoginPage1(browser);
    }

    public async dispose(): Promise<void> {
      await this.browser.close();
    }
}
