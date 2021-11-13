import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { IconContext } from "react-icons";
import { AiOutlineUser, AiOutlineLogout, AiOutlinePlus} from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { checkAuth, logout } from '../../SessionHandler/Session';

const Sidebar = () => {
  let navigate = useNavigate();

  const handleLogout = async (e) => {
    logout();
    navigate("/login")
  }

  return (
    <div className={styles.Sidebar} data-testid="Sidebar">
      <Link to="/me" >
        <div className={styles.SidebarIcon}>
          <IconContext.Provider value={{ color: "black", size: "30px" }}>
            <AiOutlineUser />
          </IconContext.Provider>
        </div>
      </Link> 
      <Link to="/add-post" >
        <div className={styles.SidebarIcon}>
          <IconContext.Provider value={{ color: "black", size: "30px" }}>
            <AiOutlinePlus />
          </IconContext.Provider>
        </div>
      </Link>
      { !checkAuth() ?
        <Link to="/login" >
          <div className={styles.SidebarIcon}>
            <IconContext.Provider value={{ color: "black", size: "30px" }}>
              <FiLogIn />
            </IconContext.Provider>
          </div>
        </Link> :
        <div className={styles.SidebarIcon} onClick={handleLogout}>
          <IconContext.Provider value={{ color: "black", size: "30px" }}>
            <FiLogOut />
          </IconContext.Provider>
        </div>
      }
    </div>
  );
};

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
