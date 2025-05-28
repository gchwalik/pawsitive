interface ContainerProps {
  title?: string;
  children: React.ReactNode; // This receives whatever is between the tags
}

function Container({ title, children }: ContainerProps) {
  title = title ? title : "I'm a title";
  return (
    <>
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <div className="bg-fuchsia-50 pt-1 rounded-lg p-5 pb-3 mt-5">
          {title && <h2 className="text-center text-xl font-medium p-2">{title}</h2>}
          {children}
        </div>
      </div>      
    </>  
  );
}

export default Container;
