import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

import Context from '../../store/createStore';

const SidebarLinks = [
  {
    path: '/',
    title: 'My Domains',
    icon: '/home.png',
  },
  {
    path: '/create-domain',
    title: 'Create Domain',
    icon: '/create.png',
  },
];

const Sidebar = () => {
  const navigation = useNavigate();
  const { logOut } = useContext(Context);
  const [OpenDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="sidebar_container">
      <div className="sidebar_container_header">
        <img src="/dns.jpg" alt="" />
        <div className="sidebar_container_header_title">Manager</div>
      </div>
      <div
        className="mobile_hambuger"
        onClick={() => {
          setOpenDrawer(!OpenDrawer);
        }}
      >
        <img src="/menu.png" alt="" />
      </div>
      <div
        className={'sidebar_mobile_drawer' + (OpenDrawer ? ' open' : '')}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="mobile_sidebar_container_header">
          <img src="/dns.jpg" alt="" />
          <div className="sidebar_container_header_title">Manager</div>

          <div
            className="mobile_hambuger_close"
            onClick={() => {
              setOpenDrawer(!OpenDrawer);
            }}
          >
            <img src="/close.png" alt="" />
          </div>
        </div>
        <div className="sidebar_container_links">
          {SidebarLinks.map(link => (
            <div
              key={link.id}
              className="sidebar_container_links_link"
              onClick={() => {
                setOpenDrawer(false);
                navigation(link.path);
              }}
            >
              <img src={link.icon} alt="" />
              <span>{link.title}</span>
            </div>
          ))}
        </div>

        <div className="sidebar_container_footer">
          <div
            className="sidebar_container_footer_item"
            onClick={() => {
              logOut();
            }}
          >
            <img src="/logout.png" alt="" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
