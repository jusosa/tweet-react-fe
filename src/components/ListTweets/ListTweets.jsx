import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";

import { getUserApi } from "../../api/user";

import "./ListTweets.scss";
import { replaceURLWithHTMLLinks } from "../../utils/generics";

export default function ListTweets(props) {
  const { tweets } = props;

  return (
    <div className="list-tweets">
      {map(tweets, (tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;

  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUserApi(tweet.user_id).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatars
          ? `${API_HOST}/avatar?id=${response.id}`
          : AvatarNotFound
      );
    });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.name} {userInfo?.last_name}
          <span>{moment(tweet.creation_date).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.message),
          }}
        />
      </div>
    </div>
  );
}
