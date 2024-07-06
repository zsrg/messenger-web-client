import { FC } from "react";

export interface IfProps {
  condition: any;
  children?: JSX.Element;
  then?: JSX.Element;
  else?: JSX.Element;
}

const If: FC<IfProps> = (props: IfProps) => props.condition ? props.then || props.children : props.else || <></>;

export default If;
