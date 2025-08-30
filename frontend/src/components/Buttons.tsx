interface ButtonContainerProps {
  className?: string;
  children?: React.ReactNode; // This receives whatever is between the tags
}

function ButtonContainer({ className = "", children }: ButtonContainerProps) {
  return (
    <div
      className={`flex justify-center items-center gap-4 mt-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default ButtonContainer;
