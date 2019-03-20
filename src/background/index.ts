if (process.env.NODE_ENV === 'development') {
  chrome.browserAction.setIcon({ path: 'icons/icon-dev-128.png' });
}

console.log('hello world', 'background');
