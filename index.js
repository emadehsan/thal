
const puppeteer = require('puppeteer');

const CREDS = require('./creds');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  
  // await page.goto('https://github.com');
  // await page.screenshot({path: 'screenshots/github.png'});

  await page.goto('https://github.com/login');

  // dom element selectors
  const USERNAME_SELECTOR = '#login_field';
  const PASSWORD_SELECTOR = '#password';
  const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

  await page.click(USERNAME_SELECTOR);
  await page.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();
  
  browser.close();
}

run();