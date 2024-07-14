import { FC } from "react";
import Avatar from "../../common/dataDisplay/Avatar";

export interface UserInfoProps {
  name: string;
  image?: string;
}

const UserInfo: FC<UserInfoProps> = ({ name, image }) => (
  <div className="user-info">
    <Avatar className="user-info__avatar" src={image} name={name} size="lg" />
    <span className="user-info__name">{name}</span>
  </div>
);

export default UserInfo;
