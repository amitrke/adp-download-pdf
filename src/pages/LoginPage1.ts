import { WebComponent, Browser, Page, findBy, Button, TextInput, elementIsVisible, pageHasLoaded, delay } from '../lib';
import { ShowIdeaPage, GoogleSignInPage, FacebookSignInPage } from './';
import config from '../config';
import { HomePage } from './HomePage';

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
    await delay(1400);
  }

  public async submitPassword(password: string): Promise<void> {
    await this.Password.type(password);
    await this.SignIn.click();
    await this.browser.wait(pageHasLoaded(ShowIdeaPage));
  }

  public async signOut(): Promise<void> {
    try {
      await this.SignOut.click();
    } catch (ex) {
      return;
    }
    await this.browser.wait(pageHasLoaded(HomePage));
  }

  public async signInWithGoogle(): Promise<void> {
    await this.browser.clearCookies('https://accounts.google.com');
    await this.signOut();

    await this.signIn(() => this.GoogleSignIn);
    await this.browser.waitAny([
      pageHasLoaded(GoogleSignInPage),
      pageHasLoaded(HomePage),
    ]);
  }

  public async signInWithFacebook(): Promise<void> {
    await this.browser.clearCookies('https://facebook.com');
    await this.signOut();

    await this.signIn(() => this.FacebookSignIn);
    await this.browser.waitAny([
      pageHasLoaded(FacebookSignInPage),
      pageHasLoaded(HomePage),
    ]);
  }

  private async signIn(locator: () => WebComponent): Promise<void> {
    await this.UserMenu.click();
    await this.browser.wait(elementIsVisible(locator));
    await locator().click();
  }
}
