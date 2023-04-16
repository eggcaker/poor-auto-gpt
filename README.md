Run ChatGPT in cli by using puppeteer communicate with chrome browser. It's a poor version of AutoGPT(The final goal). It's not perfect, but it works. 
You don't need to use api key to use this script. It's free.

## Screenshots
### Command line

https://user-images.githubusercontent.com/21374/232223263-5c6fe9a0-d59b-43d4-8e21-3ed79d681c6b.mp4

### Inside Emacs
https://user-images.githubusercontent.com/21374/231947398-1f853855-b696-44c8-9141-fb6400a728d1.mp4


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
1. Start chrome with remote debugging port
```bash
chrome --remote-debugging-port=9999
```
2. Open https://chat.openai.com/ and login in your account and make tis tab visible, even it's not active and very small.

3. Run the script to start chatting
```bash
node poor-gpt.js <Query>
```
4. Create a alias or shell script `gpt`
```
#!/usr/bin/env bash 
node <path-to-repo>/poor-gpt.js $*
```
for windows create a gpt.bat file 
```
 @echo off
    node "<path-to-repo>/poor-gpt.js" %*
```

### Editor integration
You can run the gpt command in any kind of editor. here just use Emacs for demo 
```emacs-lisp
(defun query-gpt-chat()
  "Run script command with current line content and insert output in buffer"
  (interactive)
  (let ((current-line (thing-at-point 'line t))
        (output (shell-command-to-string (concat "ngpt " (thing-at-point 'line t)))))
    (insert (mapconcat 'identity (nthcdr 4 (split-string output "\n")) "\n"))))

(global-set-key (kbd "C-;") 'query-gpt-chat)
```
which ngpt just a alias to command `node poor-gpt.js`


## todo list in the future
- [ ] Add auto gpt feature
