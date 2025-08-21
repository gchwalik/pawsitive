interface ContainerProps {
  title?: string;
  showTitleBorder?: boolean; // sets a border under the title
  minHeight?: boolean; // sets a minimum height for the container
  className?: string; // additional classes for styling
  children: React.ReactNode; // This receives whatever is between the tags
}

function Container({
  title,
  showTitleBorder = false,
  minHeight = true,
  className = "",
  children,
}: ContainerProps) {
  title = title ? title : "";
  return (
    <div
      className={`w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-amber-50 rounded-lg m-5 pt-1 shadow-lg max-h-[70vh] ${minHeight ? `min-h-96 sm:min-h-[24rem] md:min-h-[32rem] lg:min-h-[40rem]` : ""} ${className}`}
    >
      <div className="flex flex-col h-full">
        {title && (
          <h2
            className={`text-center text-xl font-medium p-3 ${showTitleBorder ? "border-b-1 border-neutral-500" : ""}`}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default Container;
