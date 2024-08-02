import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import Logo from "../../assets/logo-t.png"
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { NavLink } from "react-router-dom";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleScroll = () => {
    const top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (top > 300 && !showNavbar) {
      setShowNavbar(true);
    } else if (top <= 300 && showNavbar) {
      setShowNavbar(false);
    }
  };

  const navbarStyle = {
    animation: `${showNavbar ? 'fadeInDown' : 'fadeOutUp'} 0.5s ease`
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showNavbar]);

  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (
    <>


      <nav style={navbarStyle} className={`fixed top-0 w-full bg-white shadow-lg z-50 navbar-fixed-top bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 ${showNavbar ? 'visible' : 'hidden'}`}>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <img src={Logo} className="h-12 mr-3 " />
          </a>
          <div className="flex md:order-2 items-center">
            <NavLink to="/login">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </NavLink>

            <NavLink to="/signup">
            <button type="button" className="mx-4 text-white bg-blue-700  font-bold hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
            </NavLink>
            <NavLink to="/orgLogin" style={{ borderBottom: "none" }} className="ml-4 cursor-pointer">
              <label className="mb-2 text-md font-bold tracking-tight text-white cursor-pointer" >  Want to get your Health Check</label>
            </NavLink>

          </div>
        </div>
      </nav>

    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


