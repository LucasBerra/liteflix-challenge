import React from "react";
import "./Navbar.css";

/***** UI IMPORTS *****/
import liteflixLogo from "../../assets/liteflix-logo.svg";
import UImenu from "../../assets/ui-icons/menu.svg";
import UInotification from "../../assets/ui-icons/notification.svg";
import UIprofilePhoto from "../../assets/ui-icons/profile-photo.jpg";
import { AiOutlinePlus } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="grid_layout">
      <div className="nav-left">
        <img src={liteflixLogo} alt="Liteflix logo" id="nav--logo" />
        <div className="nav--add-movie">
          <AiOutlinePlus />
          <span> agregar película</span>
        </div>
      </div>
      <div className="nav-right">
        <img src={UImenu} alt="menu icon" id="nav--menu" />
        <img
          src={UInotification}
          alt="ícono de notificación"
          id="nav--notification"
        />
        <img src={UIprofilePhoto} alt="foto de perfil" id="nav--profile" />
      </div>
    </nav>
  );
};

export default Navbar;
