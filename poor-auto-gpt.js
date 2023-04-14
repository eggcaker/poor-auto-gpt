const puppeteer = require('puppeteer');
const { convert } = require('html-to-text');


const args = process.argv.slice(2);
const query = args.join(' ');

const options = {
  wordwrap: 130,
};

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9999/json' });
  const pages = await browser.pages();
  const page = pages[0];
  await page.type('textarea', query);
  await page.keyboard.press('Enter');

  await page.waitForFunction(() => {
    const element = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('Regenerate response'));
    if (element) {
      return true;
    }
    return false;
  }, { timeout: 30000 });

  const searchResults = await page.$$eval('div.markdown', elements => elements.map(el => el.innerHTML));
  console.log( convert(searchResults[searchResults.length - 1], options));
  browser.disconnect();
})();

