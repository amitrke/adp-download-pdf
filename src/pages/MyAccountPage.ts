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

  public async loadStatementListJson(): Promise<any> {
    await this.navigateNoWait();
    await delay(1000); //TODO: Change this to a better wait logic.
    const pageSource = await this.getPageSource();
    return JSON.parse(striptags(pageSource));
  }

  public async downloadStatement(statementUrl: string, payDate: string) {
    statementUrl = statementUrl.replace('/l2/','/myadp_prefix/');
    console.log(`About to download ${statementUrl} ${payDate}`);
    this.setUrl(`${config.baseUrl}${statementUrl}`);
    await this.navigateNoWait();
    await delay(1000); //TODO: Change this to a better wait logic.
    console.log('Done')
  }
}
