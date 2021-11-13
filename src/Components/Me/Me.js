import React from 'react';
import styles from './Me.module.scss';
import { Link } from 'react-router-dom';
import { getUser } from '../../SessionHandler/Session';

const Me = () => (
  <div className={styles.Me} data-testid="Me">
    <h3>Hello {getUser()} 👋</h3>
    <Link className={styles.Link} to="/">&larr; Home</Link>
  </div>
);

Me.propTypes = {};

Me.defaultProps = {};

export default Me;
