import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import { toast } from "react-toastify";

import { getUserApi } from "../../api/user";
import { getUserTweetsApi } from "../../api/tweet";
import useAuth from "../../hooks/useAuth";

import "./User.scss";
import ListTweets from "../../components/ListTweets/ListTweets";

function User(props) {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);
  const { match, setRefreshCheckLogin } = props;
  const loggedUser = useAuth();
  const { params } = match;

  useEffect(() => {
    getUserApi(params.userId)
      .then((response) => {
        if (!response) toast.error("Error consultando el perfil del usuario");
        setUser(response);
      })
      .catch((err) => {
        toast.error("Error consultando el perfil del usuario");
      });
  }, [params]);

  useEffect(() => {
    getUserTweetsApi(params.userId, page)
      .then((response) => {
        setTweets(response);
      })
      .catch(() => {
        setTweets([]);
      });
  }, [params]);

  const moreData = () => {
    const nextPage = page + 1;
    setLoadingTweets(true);

    getUserTweetsApi(params.userId, nextPage)
      .then((response) => {
        if (!response) {
          setLoadingTweets(0);
        } else {
          setTweets([...tweets, ...response]);
          setPage(nextPage);
          setLoadingTweets(false);
        }
      })
      .catch(() => {
        setTweets([]);
      });
  };

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>{user ? `${user?.name} ${user?.last_name}` : "User not found"}</h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div className="user__tweets">
        <h3>List Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={moreData}>
          {!loadingTweets ? (
            loadingTweets !== 0 && "Más tweets"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

export default withRouter(User);
