import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TweetModal from "../Modal/TweetModal/TweetModal";
import { Link } from "react-router-dom";
import { logout as logoutApi } from "../../api/auth";
import GlobalContext from "../../hooks/useAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const user = GlobalContext();

  const [showTweetModal, setShowTweetModal] = useState(false);

  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };

  return (
    <div className="left-menu">
      <img src={LogoWhite} alt="Twittor" className="logo" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="/" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesion
      </Link>

      <Button
        onClick={() => {
          setShowTweetModal(true);
        }}
      >
        Twittoar
      </Button>
      <TweetModal
        showTweetModal={showTweetModal}
        setShowTweetModal={setShowTweetModal}
      />
    </div>
  );
}
