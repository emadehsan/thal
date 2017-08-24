
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://github.com');
  await page.screenshot({path: 'screenshots/github.png'});
  browser.close();
});