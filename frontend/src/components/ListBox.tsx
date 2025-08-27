import type {ListBoxItemProps, ListBoxProps as AriaListBoxProps} from 'react-aria-components';
import {Header as AriaHeader, ListBox as AriaListBox, ListBoxItem as AriaListItem, ListBoxSection, Text} from 'react-aria-components';

interface ListBoxProps<T extends object> extends AriaListBoxProps<T> {
  children?: React.ReactNode;
  className?: string; // additional classes for styling
}

function ListBox<T extends object>({ children, className="", ...props }: ListBoxProps<T>) {
  return (
    <AriaListBox {...props} className={`my-listbox ${className}`}>
      <AriaHeader>Header</AriaHeader>
      {children}
    </AriaListBox>
  );
}

function ListItem(props: ListBoxItemProps) {
  return (
    <AriaListItem
      {...props}
      className={({ isFocusVisible, isSelected }) =>
        `my-item ${isFocusVisible ? 'focused' : ''} ${
          isSelected ? 'selected' : ''
        }`}
    />
  );
}

<ListBox aria-label="Ice cream flavor" selectionMode="single">
  <ListItem>Chocolate</ListItem>
  <ListItem>Mint</ListItem>
  <ListItem>Strawberry</ListItem>
  <ListItem>Vanilla</ListItem>
</ListBox>

export {ListBox, ListItem};
