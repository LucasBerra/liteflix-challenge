import React, { useState, useEffect, useContext } from "react";
import { IndexContext } from "../../index.js";
import "./Navbar.css";

/***** UI IMPORTS *****/
import liteflixLogo from "../../assets/liteflix-logo.svg";
import UImenu from "../../assets/ui-icons/menu.svg";
import UInotification from "../../assets/ui-icons/notification.svg";
import UIprofilePhoto from "../../assets/ui-icons/profile-photo.jpg";
import UIclip from "../../assets/ui-icons/clip.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";

const Navbar = () => {
  const { userMovieData, setUserMovieData } = useContext(IndexContext);
  const [modal, setModal] = useState(false);
  const [userImg, setUserImg] = useState(undefined);
  const [userTitle, setUserTitle] = useState("");

  console.log(userMovieData);

  const onImgUpload = (e) => {
    setUserImg(URL.createObjectURL(e.target.files[0]));

    const text = document.querySelector(".modal--input_img_text");
    text.textContent = e.target.files[0].name;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userMovieData.some(({ title }) => title === userTitle)) {
      setUserMovieData([
        ...userMovieData,
        { title: userTitle, img: userImg, id: Date.now() },
      ]);
    }

    // localStorage.setItem("userMovieData", JSON.stringify(userMovieData));
    console.log(userMovieData);
  };

  useEffect(() => {
    if (userTitle && userImg) {
      document.querySelector(".modal--submit").removeAttribute("disabled");
    }
  }, [userTitle, userImg]);

  return (
    <>
      {modal && (
        <div className="modal" id="modal">
          <form
            className="modal--content"
            onSubmit={handleSubmit}
            autocomplete="off"
          >
            <h3 className="modal--title">Agregar película</h3>
            <VscChromeClose
              className="modal--close"
              onClick={() => {
                setModal(false);
                setUserImg(undefined);
                setUserTitle("");
              }}
            />

            <label htmlFor="image_upload" className="modal--input_img">
              <img src={UIclip} alt="Clip" />
              <p className="modal--input_img_text">
                <b>Agregá un archivo</b> o arrastralo y soltalo aquí
              </p>

              <input
                type="file"
                accept="image/*"
                id="image_upload"
                name="image_upload"
                onChange={onImgUpload}
              />
            </label>

            <input
              type="text"
              name="title_upload"
              id="title_upload"
              placeholder="Título"
              className="modal--input_text"
              value={userTitle}
              onChange={(e) => setUserTitle(e.target.value)}
            />

            <button type="submit" className="modal--submit" disabled>
              Subir película
            </button>
          </form>
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
