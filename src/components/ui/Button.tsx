type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
    <button {...props} className={`outline-2 px-7 py-1 cursor-pointer transition-all ${className ?? ""}`}>
        {children}
    </button>
);

export default Button;