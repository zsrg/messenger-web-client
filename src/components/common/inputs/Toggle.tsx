import clsx from "clsx";
import { ChangeEvent, FC } from "react";

export interface ToggleProps {
  type: "checkbox" | "radio";
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: FC<ToggleProps> = ({
  type,
  checked,
  onChange,
  disabled,
  className,
}) => (
  <label className={clsx(`toggle-${type}`, className)}>
    <input
      type={type}
      className={`toggle-${type}__input`}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
    <span className={`toggle-${type}__element`} />
  </label>
);

export default Toggle;
