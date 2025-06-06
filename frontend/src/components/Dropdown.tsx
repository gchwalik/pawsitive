import React, { useState, useRef, useEffect, type MouseEventHandler } from 'react';
import { CaretDownIcon, type Icon } from '@phosphor-icons/react'; 


interface DropdownProps {
  label: string;
  icon?: Icon;
  children?: React.ReactNode;
}

const Dropdown = ({ label, icon, children}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative right-0 rounded-lg text-center px-3 font-medium cursor-pointer" ref={dropdownRef}>
      {!isOpen && (
        <div className="w-40 bg-zinc-50/90 border border-zinc-300 rounded-md shadow-xs z-10">
          <div className="py-1.5 flex items-center justify-center">
            {label}
            <CaretDownIcon weight="fill" className="text-lg pl-1 flex-end"/>
          </div>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
