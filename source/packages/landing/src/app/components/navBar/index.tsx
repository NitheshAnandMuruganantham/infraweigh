import * as React from 'react';
import styles from './nav.module.scss';

const Nav: React.FunctionComponent = () => {
  return (
    <nav className={styles['navBar']}>
      <ul>
        <li>logo</li>
        <li>home</li>
        <li>about</li>
        <li>products</li>
        <li>contact us</li>
        <li>login</li>
      </ul>
    </nav>
  );
};

export default Nav;
