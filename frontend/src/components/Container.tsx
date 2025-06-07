interface ContainerProps {
  title?: string;
  showTitleBorder?: boolean; // sets a border under the title
  minHeight?: boolean; // sets a minimum height for the container
  children: React.ReactNode; // This receives whatever is between the tags
}

function Container({ title, showTitleBorder = false, minHeight = true, children }: ContainerProps) {
  title = title ? title : "";
  return (
    <div className={`w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-amber-50 rounded-lg mt-15 pt-1 shadow-lg ${minHeight ? `min-h-70` : ""}`}>
      <div className="flex flex-col h-full">
        {title && (
          <h2 className={`text-center text-xl font-medium p-3 ${showTitleBorder ? 'border-b-1 border-neutral-500' : ""}`}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default Container;
