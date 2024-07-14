import clsx from "clsx";
import { ChangeEvent, FC, MouseEvent, MutableRefObject } from "react";

export interface FileInputProps {
  children: JSX.Element;
  accept?: string;
  disabled?: boolean;
  title?: string;
  className?: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({
  children,
  accept,
  disabled,
  title,
  onChange,
  inputRef,
  className,
}) => (
  <label
    className={clsx("icon-button", "file-input", { disabled }, className)}
    title={title}
    onClick={(e: MouseEvent) => (disabled ? e.preventDefault() : undefined)}
  >
    <input type="file" accept={accept} ref={inputRef} onChange={onChange} />
    {children}
  </label>
);

export default FileInput;
