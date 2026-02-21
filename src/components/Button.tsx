import { ButtonProps } from "../types";

export const Button: React.FC<ButtonProps> = ({ children, variant, className = '', onClick }) => {
  // Adjusted base classes for a cleaner look matching the image
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition duration-200 whitespace-nowrap';
  let disabled = false
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-[#1877F2] text-white hover:bg-[#156cd4] shadow-md';
      break;
    case 'secondary':
      // The "Post a project" button in the image is secondary: white background, light border, text-gray
      variantClasses = 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-300 shadow-md';
      break;
    case 'outline':
      // Used for the Sign Up button in the header
      variantClasses = 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200';
      break;
    case 'green':
      variantClasses = 'bg-[#34A853] text-white hover:bg-green-700'
      break;
    case "disabled":
      variantClasses = 'bg-[#DAF0FF] text-gray-500'
      disabled=true
      break
    case 'void':
      variantClasses= ''
      break
    case "danger":
      variantClasses = 'bg-red-600 text-white'
      break
    default:
      variantClasses = 'bg-[#34A853] text-white hover:bg-[#156cd4] shadow-md';
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
