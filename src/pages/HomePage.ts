import { WebComponent, Browser, Page, findBy, Button, TextInput, elementIsVisible, pageHasLoaded, delay } from '../lib';
import config from '../config';
import { LoginPage1 } from './LoginPage1';

export class HomePage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`https://www.adp.com/`);
  }
  
  @findBy('#new-idea-input')
  public IdeaTitle: TextInput;

  @findBy('.ui.form textarea')
  public IdeaDescription: TextInput;

  @findBy('.login-btn-desktop')
  public SignIn: Button;

  @findBy('#next')
  public SignInNext: Button;

  @findBy('.select__trigger')
  public SelectTrigger: WebComponent;
  
  @findBy('.custom-option:nth-child(4)')
  public CustomOption: WebComponent;

  @findBy('.signin')
  public UserMenu: WebComponent;

  @findBy('.fdr-profile-popup .button.google')
  public GoogleSignIn: Button;

  @findBy('.fdr-profile-popup .button.facebook')
  public FacebookSignIn: Button;

  @findBy('.signout')
  private SignOut: Button;

  public loadCondition() {
    return elementIsVisible(() => this.SignIn);
  }

  public async submitNewIdea(title: string, description: string): Promise<void> {
    await this.IdeaTitle.type(title);
    await this.IdeaDescription.type(description);
    await this.SignIn.click();
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
      pageHasLoaded(HomePage),
    ]);
  }

  public async signInWithFacebook(): Promise<void> {
    await this.browser.clearCookies('https://facebook.com');
    await this.signOut();

    await this.signIn(() => this.FacebookSignIn);
    await this.browser.waitAny([
      pageHasLoaded(HomePage),
    ]);
  }

  public async navigateToLogin(): Promise<void> {
    await delay(400);
    await this.ClickSignIn(() => this.SelectTrigger);
    await delay(1200);
    await this.SelectTrigger.click();
    await delay(1200);
    await this.CustomOption.click();
    await delay(1200);
    await this.SignInNext.click();
    await delay(1200);
    await this.browser.wait(pageHasLoaded(LoginPage1));
    await delay(1200);
  }

  private async ClickSignIn(locator: () => WebComponent): Promise<void> {
    await this.SignIn.click();
    await this.browser.wait(elementIsVisible(locator));
  }

  private async signIn(locator: () => WebComponent): Promise<void> {
    await this.UserMenu.click();
    await this.browser.wait(elementIsVisible(locator));
    await locator().click();
  }
}
