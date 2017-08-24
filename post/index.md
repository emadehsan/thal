
# Scrapping guide to Puppeteer and Chrome Headless

## Foreword
Google Chrome team announced its official tool for chrome headless called `Puppeteer` just this week. Since the official announcement of Chrome Headless in april this year, many of the industry standard libraries for automated testing have discontinued there working. The prominent of these are **PhantomJS** and **Selenium IDE for Firefox**.

For sure, Chrome being the market leader in web browsing, **Chrome Headless** is going to industry leader in **Automated Testing** of web applications. So, I have put together this starter guide on how to get started with `Web Scrapping` **Chrome Headless**.

## TL;DR
In this post we will scrap GitHub, login to it and extract emails of users using `Chrome Headless`, `Puppeteer`, `Node` and `MongoDB`. Don't worry GitHub have rate limiting mechanism in place to keep you under control but this post will give you good idea on Scrapping with Chrome Headless and Node. Also, alway stay updated with the [documentation]() because `Puppeteer` is under development and API are prone to changes.

## Prerequisites
This is a beginners guide assumes that you are familiar with `Javascript`.

## Getting Started
Before we start, we need following tools installed. Head over to there website and install them.
* [Node 8.+](https://nodejs.org)
* [MongoDB](https://mongodb.com)

## Project setup

Start of by making the project directory
```
$ mkdir thal
$ cd thal
```
Initiate NPM. And put in the necessary details.
```
$ npm init
```
Now install `Puppeteer`. As of this writing, its latest version is `0.9.0` which available via `npm repository`. But we want to avail the latest functionality. So, we would install it directly from its GitHub repository's master branch.
```
$ npm i --save https://github.com/GoogleChrome/puppeteer/
```
Puppeteer includes its own chrome, that is guaranted to work headless. So each time you install / update puppeteer, it will download its specific chrome version. Also install [`mongoose`](http://mongoosejs.com/), a wrapper around MongoDB to help ease the insertion, updation operations.
```
$ npm i --save mongoose
```
## Coding
We wil start by taking a screenshot of the page. This is code from there documentation.

### Screenshot
```js
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://github.com');
  await page.screenshot({path: 'screenshots/github.png'});
  
  browser.close();
}

run();
```

If its your first time using `Node` 7 or 8, you might be unfamiliar with `async` and `await` keywords. For a long time, a negative argument put against `Node` was [Callback Hell](http://callbackhell.com/). [`Promises`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) came along but still there was something missing. 

To put  `async/await` in really simple words, an async function returns a Promise. The promise when resolves might return the result that you asked for. But to do this in a single line, you tie the call to async function with `await`. 

Save this inside `index.js` inside project directory. Run in with
```
$ node index.js
```
The screenshot is saved inside `screenshots/` dir.

![GitHub](../screenshots/github.png)

### Login to GitHub
If you go to GitHub and search for "john" without quotes, then click the users tab. You will see list of all users with names. 

![Johns](./media/all-johns.png) 

Some of them have made their emails publically visible and some have choosen not to. But the thing is you can't see these emails without logging in. So,



### Search GitHub

### Extract and Save Emails 

### Move to next page

## To the Cloud

## End note
Deserts symbolize vastness and are witness of the struggles and sacrifices of people who `Traverse` through these gaint mountains of sand. `Thal` is desert in Pakistan spanning accross multiple districts including my home district. Somewhat similar is the case with `Internet` that we `Traversed` today. That's why I named the repository `Thal`.

If you learned something, please like and share this post.