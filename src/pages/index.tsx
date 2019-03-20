import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './index.scss';

if (document.getElementById(styles.app) == null) {
  const element = document.createElement('div');
  element.setAttribute('id', styles.app);
  document.body.appendChild(element);
  element.className = styles.app;
}

ReactDOM.render(<div>hello World</div>, document.getElementById(styles.app));
