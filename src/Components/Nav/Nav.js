import React from 'react';
import styles from './Nav.module.scss';

const Nav = () => (
  <div className={styles.Nav} data-testid="Nav">
    <img className={styles.logo} src="/images/cg.png" alt="Logo"></img>
    <span>Coastagram</span>
  </div>
);

export default Nav;
