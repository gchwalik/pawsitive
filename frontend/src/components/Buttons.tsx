interface ButtonContainerProps {
  children?: React.ReactNode; // This receives whatever is between the tags
}

function ButtonContainer({children}: ButtonContainerProps) {
  return (
    <div className="flex justify-center items-center gap-4 pb-4 mt-auto">
        {children}
    </div>
  )   
}

export default ButtonContainer;
