import 'reflect-metadata'
import { AllPages } from './pages';
import { Browser, ensure } from './lib';
import { Builder, ThenableWebDriver, WebElement, By, WebElementPromise, until } from 'selenium-webdriver';
import config from './config';

(async() => {
    let pages = new AllPages(new Browser(config.browser));
    await pages.loginPage1.navigate();
    await pages.loginPage1.submitUserId(config.userId);
    await pages.loginPage1.submitPassword(config.password);
})()
