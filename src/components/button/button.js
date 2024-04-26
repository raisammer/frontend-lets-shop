const Button = ({ className, onClickHandler , text ,type }) => {
  return (
    <button
      
      className={`text-xl font-bold bg-slate-700 text-white rounded-xl h-10 hover:bg-slate-600  border-black border-2
       items-center  ${className}`}
       onClick={onClickHandler}
       type={type}
    >
      {text}
    </button>
  )
}
export default Button
