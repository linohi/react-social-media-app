import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => (
  <div className={styles.NotFound} data-testid="NotFound">
    <div className={styles.Container}>
      <img src="images/404.svg" alt="404"></img>
      <span>Not Found!</span>
    </div>
  </div>
);

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
