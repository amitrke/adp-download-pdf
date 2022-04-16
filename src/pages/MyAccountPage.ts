import { WebComponent, Browser, Page, findBy, Button, TextInput, elementIsVisible, pageHasLoaded, delay } from '../lib';
import { ShowIdeaPage, GoogleSignInPage, FacebookSignInPage } from './';
import config from '../config';
import { HomePage } from './HomePage';

export class MyAccountPage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${config.baseUrl}/static/redbox/login.html`);
  }

  @findBy('#login-form_username')
  public UserId: TextInput;

  @findBy('#login-form_password')
  public Password: TextInput;

  @findBy('#verifUseridBtn')
  public VerifyUserId: Button;

  public loadCondition() {
    return elementIsVisible(() => this.VerifyUserId);
  }

  //TODO: Get list of PDF files from https://my.adp.com/myadp_prefix/v1_0/O/A/payStatements?adjustments=yes&numberoflastpaydates=160
  
}
