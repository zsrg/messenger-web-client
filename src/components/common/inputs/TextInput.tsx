import clsx from "clsx";
import IconButton from "./IconButton";
import If from "../utils/If";
import useToggle from "../../../hooks/useToggle";
import { ChangeEvent, FC } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TextInputProps {
  value: string;
  type?: "text" | "password";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({
  value,
  type,
  placeholder,
  disabled,
  className,
  onChange,
}) => {
  const [isPasswordShow, togglePasswordShow] = useToggle(false);

  return (
    <div className={clsx("text-input", className)}>
      <input
        className="text-input__input"
        type={type === "password" ? (isPasswordShow ? "text" : "password") : "text"}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      />

      <If condition={type === "password"}>
        <IconButton
          className="text-input__button"
          onClick={togglePasswordShow}
          disabled={disabled}
        >
          <FontAwesomeIcon icon={isPasswordShow ? faEyeSlash : faEye} />
        </IconButton>
      </If>
    </div>
  );
};

export default TextInput;
