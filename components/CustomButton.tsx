import { CustomButtonProps } from "@/types";
import Loader from "./Loader";

// ZMIANA: 'icon' został zmieniony na 'rightIcon'
const CustomButton = ({ title, handleClick, containerStyle, type, isLoading, rightIcon, disabled }: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      // ZMIANA: Usunięto błędny atrybut 'rightIcon' z tego miejsca
      className={`outline-none px-4 py-1.5 md:py-2.5 md:px-6 text-center flex items-center justify-center capitalize bg-blue-500 dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-zinc-600 rounded-full hover:ring-4 hover:ring-cyan-400/30 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-400/25 dark:hover:border-cyan-300 dark:hover:shadow-cyan-300/25 transition-all duration-300 ease-out ${containerStyle} gap-2 ${isLoading && 'bg-opacity-90'} ${disabled && 'opacity-50 cursor-not-allowed'}`}
    >
      <span>{title}</span>
      {isLoading && <Loader/>}
      {/* ZMIANA: Renderujemy teraz 'rightIcon' zamiast 'icon' */}
      {rightIcon && rightIcon}
    </button>
  )
}

export default CustomButton;