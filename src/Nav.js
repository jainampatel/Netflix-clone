import React, { useEffect, useState } from "react";
import "./Nav.css";
const Nav = () => {
  const [handleShow, sethandleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        sethandleShow(true);
      } else sethandleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          sethandleShow(true);
        } else sethandleShow(false);
      });
    };
  }, []);

  return (
    <div className={`nav ${handleShow && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="Netflix Logo"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix Avatar"
        className="nav__avatar"
      />
    </div>
  );
};

export default Nav;
