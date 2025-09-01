interface ContainerProps {
  minHeight?: boolean; // sets a minimum height for the container
  className?: string; // additional classes for styling
  children: React.ReactNode; // This receives whatever is between the tags
}

function Container({
  minHeight = true,
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        w-full sm:w-3/4 md:w-2/3 lg:w-1/2 
        max-h-[70vh] ${minHeight ? `min-h-96 sm:min-h-[24rem] md:min-h-[32rem] lg:min-h-[40rem]` : ""} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
