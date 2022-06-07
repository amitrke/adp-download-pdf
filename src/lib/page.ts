import { Browser, WaitCondition } from './';

export interface NewablePage<T extends Page> {
  new(browser: Browser): T;
}

export abstract class Page {
  private url: string;

  protected setUrl(url: string) {
    this.url = url;
  }

  public async navigate(): Promise<void> {
    await this.browser.navigate(this.url);
    await this.browser.wait(this.loadCondition());
  }

  public async navigateNoWait(): Promise<void> {
    await this.browser.navigate(this.url);
  }

  public async getPageSource(): Promise<string> {
    return this.browser.getPageSource();
  }

  public async getCookieValue(name: string): Promise<string> {
    return this.browser.getCookieValue(name);
  }
  public abstract loadCondition(): WaitCondition;

  public constructor(protected browser: Browser) {

  }
}
