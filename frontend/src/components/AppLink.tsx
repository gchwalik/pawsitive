import type React from "react";
import { useRef } from "react";
import { useLink } from "react-aria";
import { Link } from "react-router";

  interface AppLinkProps extends React.DOMAttributes<Element>{
    to: string;
    className: string;
    children?: React.ReactNode;
  }

  export default function AppLink({
    to,
    className = "",
    children,
    ...props
  }: AppLinkProps) {
    const ref = useRef(null);
    const { linkProps } = useLink(props, ref);

    return (
      <Link to={to} ref={ref} className={className} {...linkProps}>
        {children}
      </Link>
    );
  }
