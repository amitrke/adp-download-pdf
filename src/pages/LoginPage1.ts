import { WebComponent, Browser, Page, findBy, Button, TextInput, elementIsVisible, pageHasLoaded, delay } from '../lib';
import config from '../config';
import { HomePage } from './HomePage';
import { MyAccountPage } from './MyAccountPage';

export class LoginPage1 extends Page {
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

  @findBy('#signBtn')
  public SignIn: Button;

  @findBy('.signin')
  public UserMenu: WebComponent;

  @findBy('.fdr-profile-popup .button.google')
  public GoogleSignIn: Button;

  @findBy('.fdr-profile-popup .button.facebook')
  public FacebookSignIn: Button;

  @findBy('.signout')
  private SignOut: Button;

  public loadCondition() {
    return elementIsVisible(() => this.VerifyUserId);
  }

  public async submitUserId(userId: string): Promise<void> {
    await this.UserId.type(userId);
    await this.VerifyUserId.click();
    await this.browser.wait(elementIsVisible(() => { return this.Password }));
  }

  public async submitPassword(password: string): Promise<void> {
    await this.Password.type(password);
    await this.SignIn.click();
    await this.browser.waitAny([
      pageHasLoaded(MyAccountPage),
    ]);
  }

}
