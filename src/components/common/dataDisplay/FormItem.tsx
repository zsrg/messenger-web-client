import If from "../utils/If";
import { FC } from "react";

export interface FormItemProps {
  children: JSX.Element;
  title?: string;
}

const FormItem: FC<FormItemProps> = ({ title, children }) => (
  <div className="form-item">
    <If condition={title}>
      <span>{title}</span>
    </If>
    {children}
  </div>
);

export default FormItem;
