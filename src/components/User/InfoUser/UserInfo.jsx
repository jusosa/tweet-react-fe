import React from "react";
import moment from "moment";
import localization from "moment/locale/es";

import { Location, DateBirth, Link } from "../../../utils/icons";

import "./InfoUser.scss";

export default function UserInfo(props) {
  const { user } = props;

  return (
    <div className="info-user">
      <h2 className="name">{user ? `${user?.name} ${user?.last_name}` : ""}</h2>
      <p className="email">{user?.mail}</p>
      {user?.biography && <p className="email">{user?.biography}</p>}

      <div className="more-info">
        {user?.location && (
          <p>
            <Location />
            {user.location}
          </p>
        )}
        {user?.web && (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={user.web}
            alt={user.web}
            target="_blank"
            rel="noopener noreferreer"
          >
            <Link />
            {user.web}
          </a>
        )}
        {user?.birthdate && (
          <p>
            <DateBirth />
            {moment(user.birthdate).locale("es", localization).format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
