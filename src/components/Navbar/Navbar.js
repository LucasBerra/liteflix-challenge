import React, { useState } from "react";
import "./Navbar.css";

/***** UI IMPORTS *****/
import liteflixLogo from "../../assets/liteflix-logo.svg";
import UImenu from "../../assets/ui-icons/menu.svg";
import UInotification from "../../assets/ui-icons/notification.svg";
import UIprofilePhoto from "../../assets/ui-icons/profile-photo.jpg";
import { AiOutlinePlus } from "react-icons/ai";

const modalElement = document.querySelector("#modal");

const Navbar = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && (
        <div className="modal" id="modal" onClick={() => setModal(false)}>
          <div className="modal--content">
            <p>Modal contenttt</p>
          </div>
        </div>
      )}

      <nav className="grid_layout">
        <div className="nav-left">
          <img src={liteflixLogo} alt="Liteflix logo" id="nav--logo" />
          <div className="nav--add-movie" onClick={() => setModal(true)}>
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
    </>
  );
};

export default Navbar;
