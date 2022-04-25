import 'reflect-metadata'
import { AllPages } from './pages';
import { Browser } from './lib';
import config from './config';

(async() => {
    let pages = new AllPages(new Browser(config.browser));
    await pages.loginPage1.navigate();
    await pages.loginPage1.submitUserId(config.userId);
    await pages.loginPage1.submitPassword(config.password);
    const statements = await pages.myAccountPage.loadStatementListJson();
    for (const statement of statements.payStatements) {
        await pages.myAccountPage.downloadStatement(statement.statementImageUri.href, statement.payDate)
    }
})()
