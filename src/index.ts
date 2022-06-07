import 'reflect-metadata'
import { AllPages } from './pages';
import { Browser } from './lib';
import config from './config';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

async function downloadStatement(sessionCookie: string, statementUrl: string, payDate: string) {
    statementUrl = statementUrl.replace('/l2/','/myadp_prefix/');
    console.log(`About to download ${statementUrl} ${payDate}`);
    try{
        const {data, status} = await axios.get(
            `https://my.adp.com${statementUrl}`, {
            headers: {
                'Cookie': `SMSESSION=${sessionCookie}`
            },
            responseType: 'blob'
        });
        const filePath = path.join(config.folder, `${payDate}.pdf`);
        fs.writeFileSync(filePath, data, 'binary');
        console.log(`Downloaded file ${filePath}`);
    } catch(err) {
        console.error(err);
    }
}

(async() => {
    let pages = new AllPages(new Browser(config.browser));
    await pages.loginPage1.navigate();
    await pages.loginPage1.submitUserId(config.userId);
    await pages.loginPage1.submitPassword(config.password);
    const statements = await pages.myAccountPage.loadStatementListJson();
    const sessionCookie = await pages.myAccountPage.getSessionCookie();
    for (const statement of statements.payStatements) {
        await downloadStatement(sessionCookie, statement.statementImageUri.href, statement.payDate)
    }
})()
