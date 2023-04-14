* PoorAutoGPT

Run ChatGPT in cli by using puppeteer communicate with chrome browser. It's a poor version of AutoGPT. It's not perfect, but it works. 
You don't need to use api key to use this script. It's free.

## Prerequisites
- nodejs
- google chrome
- ChatGPT account logged in

## Installation

```bash
npm install -g puppeteer
npm install -g html-to-text
```

## Usage
- Start chrome with remote debugging port
```bash
chrome --remote-debugging-port=9999
```

```bash
node poor-auto-gpt.js <Query>
```


## todo list in the future
- [ ] Add auto gpt feature
