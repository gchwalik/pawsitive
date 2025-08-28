import type React from "react";
import { useRef } from "react";
import { useLink } from "react-aria";
import { Link } from "react-router";

interface AppLinkProps {
  to: string;
  className: string;
  children?: React.ReactNode;
}

export default function AppLink({
  to,
  className = "",
  children,
  ...ariaProps
}: AppLinkProps) {
  const ref = useRef(null);
  const { linkProps } = useLink(ariaProps, ref);

  return (
    <Link to={to} ref={ref} className={className} {...linkProps}>
      {children}
    </Link>
  );
}
