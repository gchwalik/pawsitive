import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListItem,
} from "react-aria-components";

interface ListBoxProps {
  className?: string; // additional classes for styling
  children: React.ReactNode; // This receives whatever is between the tags
}

function AppListBox({
  className = "",
  children,
  ...props
}: ListBoxProps) {
  return (
    <AriaListBox {...props} className={className}>
      {children}
    </AriaListBox>
  );
}

interface AppListBoxItemProps {
  children: React.ReactNode; // This receives whatever is between the tags
  textValue: string;
}

function AppListBoxItem({ children, ...props }: AppListBoxItemProps) {
  return <AriaListItem {...props}>{children}</AriaListItem>;
}

export { AppListBox, AppListBoxItem };
