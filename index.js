
const puppeteer = require('puppeteer');

const CREDS = require('./creds');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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

	let userToSearch = 'john';
	let searchUrl = 'https://github.com/search?q=' + userToSearch + '&type=Users&utf8=%E2%9C%93';
	// let searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=bashua&type=Users';

	await page.goto(searchUrl);
	await page.waitFor(2 * 1000);

	// let LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a > em';
	let LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a > em';
	// let LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > ul > li:nth-child(2) > a';
	let LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > ul > li:nth-child(2) > a';

	let LENGHT_SELECTOR_CLASS = 'user-list-item';

	let content = await page.content();
	let DOM = new JSDOM(content);

	let numPages = await getNumPages(DOM);
	console.log('Numpages: ', numPages);
	
	for (let h = 1; h <= numPages; h++) {

		let pageUrl = searchUrl + '&p=' + h;
		let users = [];

		await page.goto(pageUrl);
		content = await page.content();
		DOM = new JSDOM(content);

		let listLength = DOM.window.document.getElementsByClassName(LENGHT_SELECTOR_CLASS).length;
		
		console.log('lisLenght: ', listLength);

		for (let i = 1; i <= listLength; i++) {
			// change the hmtl index to the next child
			let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
			let emailSelector = LIST_EMAIL_SELECTOR.replace("INDEX", i);

			let username = DOM.window.document.querySelector(usernameSelector);
			let email = DOM.window.document.querySelector(emailSelector);

			if (!email) 
				continue;

			username = username.innerHTML;
			email = email.innerHTML;

			console.log(username, ' -> ', email);

			users.push({username: username, email: email});
		}
		// TODO save users
	}


	browser.close();
}

async function getNumPages(DOM) {
	let NUM_USER_SELECTOR = '#js-pjax-container > div.container > div > div.column.three-fourths.codesearch-results.pr-6 > div.d-flex.flex-justify-between.border-bottom.pb-3 > h3'

	let inner = DOM.window.document.querySelector(NUM_USER_SELECTOR).innerHTML;

	// format is: "69,803 users"
	inner = inner.replace(',', '').replace(' users', '');

	let numUsers = parseInt(inner);

	console.log('numUsers: ', numUsers);

	/*
	* GitHub shows 10 resuls per page, so
	*/
	let numPages = Math.ceil(numUsers / 10);
	return numPages;
}

run();