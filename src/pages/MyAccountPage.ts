import { WebComponent, Browser, Page, findBy, Button, TextInput, elementIsVisible, pageHasLoaded, delay } from '../lib';
import config from '../config';
import { HomePage } from './HomePage';
import striptags from 'striptags';

export class MyAccountPage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${config.baseUrl}/myadp_prefix/v1_0/O/A/payStatements?adjustments=yes&numberoflastpaydates=160`);
  }

  
  @findBy('#login-form_username')
  public UserId: TextInput;

  @findBy('#login-form_password')
  public Password: TextInput;

  @findBy('.statements-list-container')
  public StatementListContainer: WebComponent;

  public loadCondition() {
    return elementIsVisible(() => this.StatementListContainer);
  }

  public async getSessionCookie(): Promise<string> {
    return this.getCookieValue('SMSESSION');
  }

}
