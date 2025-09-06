import { CaretDownIcon, CompassIcon } from "@phosphor-icons/react";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";

import AppLink from "./AppLink";

function Navbar() {
  return (
    <nav className="navbar">
      <AppLink to="/" className="flex flex-1">
        <CompassIcon
          className="text-4xl font-semibold mr-0.75"
          weight="light"
        />
        <h1 className="text-3xl font-medium">Pawsitive</h1>
      </AppLink>

      <MenuTrigger>
        <Button className="dropdown-button w-30" aria-label="Menu">
          <span className="flex-1">More</span>
          <span aria-hidden="true">
            <CaretDownIcon className="ml-1" size={16} />
          </span>
        </Button>
        <Popover className="dropdown-popover w-40" placement="bottom end">
          <Menu className="flex flex-col gap-1">
            <MenuItem className="px-3 py-1 dropdown-element">
              <AppLink to="/place-types" className="block w-full">
                Place Types
              </AppLink>
            </MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </nav>
  );
}

export default Navbar;
