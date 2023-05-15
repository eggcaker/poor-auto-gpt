const puppeteer = require("puppeteer");
const { convert } = require("html-to-text");

const args = process.argv.slice(2);
const query = args.join(" ");

const options = {
  wordwrap: 130,
};

(async () => {
  const browser = await puppeteer.connect({
    browserURL: "http://127.0.0.1:9999/json",
    defaultViewport: null,
    timeout: 0,
    protocolTimeout: 120000,
  });

  const pages = await browser.pages();

  const chatGPTUrl = "https://chat.openai.com/";

  let page = pages.filter((p) => p.url().startsWith(chatGPTUrl))[0];

  if (page) {
    if (query != "Cg==" && query.length > 3) {
      let queryDecode = Buffer.from(query, "base64").toString();

      let messages = [];
      if (queryDecode.indexOf("POOR_GPT_SEP") > -1) {
        messages = queryDecode.split("POOR_GPT_SEP");
      } else {
        messages[0] = queryDecode;
      }

      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        await page.type("textarea", message);
        await page.keyboard.down("Shift");
        await page.keyboard.press("Enter");
        await page.keyboard.up("Shift");
      }

      await page.keyboard.press("Enter");

      await page.waitForFunction(
        () => {
          const element = Array.from(document.querySelectorAll("div")).find(
            (el) => el.textContent.includes("Regenerate response")
          );
          if (element) {
            return true;
          }
          return false;
        },
        { timeout: 60000 }
      );

      const searchResults = await page.$$eval("div.markdown", (elements) =>
        elements.map((el) => el.innerHTML)
      );
      console.log(convert(searchResults[searchResults.length - 1], options));
    }
  } else {
    console.log("ChatGPT tab not found.");
  }

  browser.disconnect();
})();
