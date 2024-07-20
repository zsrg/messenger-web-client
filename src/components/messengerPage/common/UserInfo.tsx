import Avatar from "../../common/dataDisplay/Avatar";
import { FC } from "react";

export interface UserInfoProps {
  name: string;
  login: string;
  image?: string;
}

const UserInfo: FC<UserInfoProps> = ({ name, login, image }) => (
  <div className="user-info">
    <Avatar className="user-info__avatar" src={image} name={name} size="lg" />
    <div className="user-info__info">
      <span>{name}</span>
      <span>@{login}</span>
    </div>
  </div>
);

export default UserInfo;
