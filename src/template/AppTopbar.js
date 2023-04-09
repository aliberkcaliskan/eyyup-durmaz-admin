import classNames from "classnames";
import { Menu } from "primereact/menu";
import { ToggleButton } from "primereact/togglebutton";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";

export const AppTopbar = (props) => {
  const { logout } = useContext(UserContext);
  const { theme, actions } = useContext(AppContext);
  const menu = useRef(null);

  const items = [
    {
      label: 'Çıkış Yap',
      icon: "pi pi-sign-out",
      command: () => {
        logout();
      },
    },
  ];

  const handleThemeMode = (e) => {
    actions.changeTheme(e.value ? "dark" : "light");
  };
  return (
    <div className="layout-topbar">
      <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
        <i className="pi pi-bars" />
      </button>
      <Link to="/" className="layout-topbar-logo flex justify-content-center">
        <img className={theme === "light" ? "light w-10" : "dark w-10"} src="/images/logo.png" alt="Logo" /> <span style={{ fontSize: '15px' }}> İkinci Çerçeve Psikoloji</span>
      </Link>
      <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
        <i className="pi pi-ellipsis-v" />
      </button>
      <ul className={classNames("layout-topbar-menu lg:flex origin-top align-items-center", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
        <li className="flex align-items-center">
          <ToggleButton className="mr-2" checked={theme === "dark" ? true : false} onChange={(e) => handleThemeMode(e)} onIcon="pi pi-moon" offIcon="pi pi-sun" onLabel="" offLabel="" />
        </li>
        <li>
          <button className="layout-topbar-button" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup>
            <i className="pi pi-user" />
            <span>Profil</span>
          </button>
          <Menu model={items} popup ref={menu} id="popup_menu" />
        </li>
      </ul>
    </div >
  );
};
