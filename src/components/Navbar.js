import React, { useState, useEffect, useContext } from "react";
import { IndexContext } from "../index.js";
import "../styles/Navbar/Navbar.css";

// ASSETS:
import liteflixLogo from "../assets/liteflix-logo.svg";
import UImenu from "../assets/ui-icons/menu.svg";
import UInotification from "../assets/ui-icons/notification.svg";
import UIprofilePhoto from "../assets/ui-icons/profile-photo.jpg";
import UIaddMovie from "../assets/ui-icons/add_movie.svg";
import UIclip from "../assets/ui-icons/clip.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";

const Navbar = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <Modal setModal={setModal} />}

      <nav className="grid_layout">
        <img
          src={UIaddMovie}
          alt="Agregar película (mobile)"
          className="nav--add-movie-mobile"
          onClick={() => setModal(true)}
        />

        <div className="nav-left">
          <img src={liteflixLogo} alt="Logo de Liteflix" id="nav--logo" />
          <div className="nav--add-movie" onClick={() => setModal(true)}>
            <AiOutlinePlus />
            <span> agregar película</span>
          </div>
        </div>

        <div className="nav-right">
          <img
            src={UImenu}
            alt="Ícono de menu"
            id="nav--menu"
            className="hide-in-mobile"
          />
          <img
            src={UInotification}
            alt="Ícono de notificación"
            id="nav--notification"
            className="hide-in-mobile"
          />
          <img src={UIprofilePhoto} alt="Foto de perfil" id="nav--profile" />
        </div>
      </nav>
    </>
  );
};

const convertToBase64 = (img) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const Modal = ({ setModal }) => {
  const { userMovieData, setUserMovieData, setNotification } =
    useContext(IndexContext);
  const [userImg, setUserImg] = useState(undefined);
  const [userTitle, setUserTitle] = useState("");

  const [movieSubmitted, setMovieSubmitted] = useState(false);

  const onImgUpload = async (e) => {
    if (e.target.files[0].size > 1048576) {
      const bigFile = document.querySelector("#image_upload");
      bigFile.value = "";

      setNotification("Tamaño de imágen excedido (1mb)");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      return;
    }

    const base64URL = await convertToBase64(e.target.files[0]);
    setUserImg(base64URL);

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
      setMovieSubmitted(true);
    } else {
      setNotification("La película ya se agregó");
      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  };

  const closeModal = () => {
    setModal(false);
    setUserImg(undefined);
    setUserTitle("");
  };

  useEffect(() => {
    if (userTitle && userImg) {
      document.querySelector(".modal--button").removeAttribute("disabled");
    }
  }, [userTitle, userImg]);

  return (
    <div className="modal" id="modal">
      {movieSubmitted ? (
        <div className="modal--content">
          <VscChromeClose
            className="modal--close hide-on-mobile"
            onClick={closeModal}
          />
          <img
            src={UIprofilePhoto}
            alt="Foto de perfil"
            className="modal--profile hide-outside-mobile"
          />

          <img
            src={liteflixLogo}
            alt="Liteflix Logo"
            className="modal--title"
          />

          <div className="modal--submitted">
            <h3>¡Felicitaciones!</h3>
            <p>{userTitle} fue correctamente subida.</p>
          </div>

          <div className="modal--button_container">
            <button className="modal--button" onClick={closeModal}>
              Ir a Home
            </button>
          </div>
        </div>
      ) : (
        <form
          className="modal--content"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <VscChromeClose
            className="modal--close hide-on-mobile"
            onClick={closeModal}
          />
          <img
            src={UIprofilePhoto}
            alt="Foto de perfil"
            className="modal--profile hide-outside-mobile"
          />

          <img
            src={liteflixLogo}
            alt="Logo de Liteflix"
            className="modal--logo hide-outside-mobile"
          />
          <h3 className="modal--title">Agregar película</h3>

          <label htmlFor="image_upload" className="modal--input_img">
            <img src={UIclip} alt="Clip" />
            <p className="modal--input_img_text">
              <b>Agregá un archivo</b>{" "}
              <span className="hide-in-mobile">
                o arrastralo y soltalo aquí
              </span>
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
            onChange={(e) => setUserTitle(e.target.value.toUpperCase())}
          />

          <div className="modal--button_container">
            <button type="submit" className="modal--button" disabled>
              Subir película
            </button>

            <div
              className="modal--button modal--close_button hide-outside-mobile"
              onClick={closeModal}
            >
              Salir
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Navbar;
