import React, { useState, useRef, useEffect, type MouseEventHandler } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react'; 

import type { Icon } from '@phosphor-icons/react';
import { Link } from 'react-router';

interface DropdownProps {
  label: string;
  icon?: Icon;
  children?: React.ReactNode;
}

const Dropdown = ({ label, icon: Icon, children}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log("escape")
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleKeyDown);}
  }, []);

  return (
    <div className="relative z-10 text-md" ref={dropdownRef}>
      <button className="px-3 w-40 text-center font-medium cursor-pointer bg-zinc-50/90 border border-zinc-300 hover:bg-white rounded-lg shadow-xs focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <div className="py-1.5 flex items-center justify-center ">
            {Icon && <Icon className="w-5 h-5 mr-1 "/>}
            {label}
            <CaretDownIcon weight="fill" 
              className={`w-4 h-4 ml-1.5 transition-transform duration-325 ${isOpen ? 'rotate-180 mt-0.5' : ''}`}
            />
          </div>
      </button>

        <div className="absolute top-full right-0 mt-0.5">
          <div className={`
            transition-all duration-325 ease-in-out w-48 bg-zinc-50/90 border border-zinc-300 hover:bg-white 
            rounded-md shadow-lg z-10
          ${    isOpen 
      ? 'opacity-100' 
      : 'opacity-0'}  
          `}>
            {children}
          </div>
        </div>
      
    </div>
  );
};


interface DropdownItemProps {
  icon?: Icon;
  onClick: MouseEventHandler;
  children: React.ReactNode;
}

// Use when clicking does something or triggers an action, like a button
const DropdownItem = ({ children, onClick, icon: ListIcon }: DropdownItemProps) => (
  <button
    onClick={onClick}
    className="
        flex items-center w-full px-4 py-2 text-md 
        text-gray-700 hover:bg-gray-100 hover:text-gray-900  
        first:hover:rounded-t-lg last:hover:rounded-b-lg
      "
  >
    {ListIcon && <ListIcon className="w-4 h-4 mr-3" />}
    {children}
  </button>
);


interface DropdownLinkProps {
  to: string;
  icon?: Icon;
  children?: React.ReactNode;
}

// Use when clicking takes you somewhere else, like navigating to another page
const DropdownLink = ({ to, children, icon: Icon }: DropdownLinkProps) => (
  <Link
    to={to}
    className="
        flex items-center w-full px-4 py-2 text-md 
        text-gray-700 hover:bg-gray-100 hover:text-gray-900  
        first:hover:rounded-t-lg last:hover:rounded-b-lg
      "  >
    {Icon && <Icon className="w-4 h-4 mr-3" />}
    {children}
  </Link>
);

export { Dropdown, DropdownItem, DropdownLink };
