




interface ButtonProps{
  text:string;
  onClick?:()=>void;
  icon?: React.ReactNode;
  variant?: 'Primary'|'Danger';
  iconBG?: string;
  textStyle?: string;
  className?: string;
  
}
const ButtonProps:React.FC<ButtonProps>=({text,onClick,icon,variant='Primary',className ,iconBG , textStyle })=>{

  


    

  //const [background,setBackgroud]=useState('bg-gray-100')

  const baseStyles='flex items-center gap-2  p-2 rounded-lg transition w-full ';
  const variants={
    Primary: 'bg-gray-100 hover:bg-yellow-500',
    Danger: "bg-red-500 hover:bg-red-600"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className || ""} ${textStyle ||''} `}>
      <div className={`${iconBG || ""}`}>
    {icon}
    </div>

    <div className='mt-1 pl-2'>
    {text}
    </div>

  </button>
  )
}

export default ButtonProps;