/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";

import { AppTopbar } from "./AppTopbar";
import { AppMenu } from "./AppMenu";
import TheContent from "./TheContent";
import pageURL from "../utils/pageUrls";
import { AppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";

export default function TheLayout() {
  const [layoutMode] = useState("static");
  const [layoutColorMode] = useState("light");
  const [sideMenu, setSideMenu] = useState([]);
  const [inputStyle] = useState("outlined");
  const [ripple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const { theme } = useContext(AppContext);
  const { user } = useContext(UserContext);


  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    const themeHref = `${process.env.REACT_APP_SITE_URL}/assets/themes/${theme === "dark" ? "lara-dark-teal" : "lara-light-teal"}/theme.css`;
    document.querySelector("#theme-link").href = themeHref;
  }, [theme]);

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };

  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const menu = [
    { label: "Anasayfa", icon: "pi-fw pi-home", to: pageURL.home },
    { label: "Klinikler", icon: "pi-fw pi-building", to: pageURL.clinics },
    { label: "Randevular", icon: "pi-fw pi-calendar", to: pageURL.reservations },
    { label: "Odalar", icon: "pi-fw pi-box", to: pageURL.rooms },
    { label: "Kullanıcılar", icon: "pi-fw pi-user", to: pageURL.users },

    // {
    //   code: Authority.Customer_List,
    //   label: "general.companyManagement",
    //   icon: "pi-sliders-h",
    //   items: [
    //     { code: Authority.Staff_List, label: "general.companyManagement", icon: "pi-id-card", to: pageURL.companyManagement },
    //   ],
    // },
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });

  useEffect(() => {
    const filterMenu = menu
      .map((item) => {
        if (item.items && item.items.length > 0) {
          const subItems = [];
          item.items.map((sub) => {
            subItems.push(sub);
          });

          return { ...item, items: subItems };
        } else {
          return item;
        }
      })
      .filter((item) => typeof item !== "undefined");
    setSideMenu([{ items: filterMenu }]);
  }, [user]);

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

      <div className="layout-sidebar" onClick={onSidebarClick}>
        <AppMenu model={sideMenu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
      </div>

      <TheContent />

      <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>
    </div>
  );
}
