console.log('hello world', 'contentScript');

import * as styles from './index.scss';

const element = document.createElement('iframe');
document.body.appendChild(element);
element.setAttribute('id', styles.injectIFrame);
element.src = chrome.extension.getURL('index.html');
