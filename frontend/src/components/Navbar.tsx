import { CompassIcon } from "@phosphor-icons/react";

import AppLink from "./AppLink";
import { Dropdown, DropdownLink } from "./Dropdown";

function Navbar() {
  return (
    <nav className="navbar">
      <AppLink to="/" className="flex">
        <CompassIcon
          className="text-4xl font-semibold mr-0.75"
          weight="light"
        />
        <h1 className="text-3xl font-medium">Pawsitive</h1>
      </AppLink>

      <div className="ml-auto">
        <Dropdown label="More">
          <DropdownLink to="#">Place Types</DropdownLink>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Navbar;
