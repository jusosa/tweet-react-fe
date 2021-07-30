import React, { useState, useEffect } from "react";
import { API_HOST } from "../../../utils/constants";
import {
  checkFollowApi,
  followUserApi,
  unFollowUserApi,
} from "../../../api/follow";
import { Button, Spinner } from "react-bootstrap";

import AvatarNotFound from "../../../assets/png/avatar-no-found.png";

import "./BannerAvatar.scss";
import ConfigModal from "../../Modal/ConfigModal/ConfigModal";
import EditUser from "../EditUser";

export default function BannerAvatar(props) {
  const [show, setShow] = useState(false);
  const [following, setFollowing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reloadFollow, setReloadFollow] = useState(false);

  const { user, loggedUser } = props;
  const bannerUrl = user?.banners ? `${API_HOST}/banner?id=${user.id}` : null;
  const avatarUrl = user?.avatars
    ? `${API_HOST}/avatar?id=${user.id}`
    : AvatarNotFound;

  useEffect(() => {
    if (user) {
      checkFollowApi(user?.id).then((response) => {
        setFollowing(response?.status);
      });
      setReloadFollow(false);
    }
  }, [user, reloadFollow]);

  const onFollow = () => {
    setLoading(true);
    followUserApi(user.id).then(() => {
      setFollowing(true);
      setReloadFollow(true);
    });
    setLoading(false);
  };
  const onUnFollow = () => {
    setLoading(true);
    unFollowUserApi(user.id).then(() => {
      setFollowing(false);
      setReloadFollow(true);
    });
    setLoading(false);
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          {loggedUser._id === user.id && (
            <Button onClick={() => setShow(true)}>Editar perfil</Button>
          )}
          {loggedUser._id !== user.id &&
            following !== null &&
            (following ? (
              <Button onClick={onUnFollow} className="unfollow">
                <span>Siguiendo</span>
              </Button>
            ) : (
              <Button onClick={onFollow}>
                {loading && <Spinner animation="border" size="sm" />}Seguir
              </Button>
            ))}
        </div>
      )}
      <ConfigModal show={show} setShow={setShow} title="Editar">
        <EditUser user={user} setShow={setShow} />
      </ConfigModal>
    </div>
  );
}
