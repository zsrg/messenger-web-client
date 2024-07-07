import clsx from "clsx";
import If from "../utils/If";
import { FC } from "react";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "lg";
  className?: string;
}

interface AvatarStyle {
  background?: string;
}

const Avatar: FC<AvatarProps> = ({ src, name, size, className }) => {
  const style: AvatarStyle = {};

  if (src) {
    style.background = `url(${src})`;
  }

  const isLetter = !src && name;

  return (
    <div
      className={clsx(
        "avatar",
        {
          "avatar-sm": size === "sm",
          "avatar-lg": size === "lg",
          "letter-avatar": isLetter,
          "image-avatar": src,
        },
        className
      )}
      style={style}
    >
      <If condition={isLetter}>
        <span>{name?.[0]}</span>
      </If>
    </div>
  );
};

export default Avatar;
