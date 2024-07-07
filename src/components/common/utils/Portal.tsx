import { createPortal } from "react-dom";
import { FC } from "react";

export interface PortalProps {
  children: JSX.Element;
  container: Element;
}

const Portal: FC<PortalProps> = (props: PortalProps) => createPortal(props.children, props.container);

export default Portal;
