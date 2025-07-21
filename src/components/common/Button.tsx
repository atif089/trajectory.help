type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "delete";
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  size = "md",
  variant = "primary",
  ...props
}) => {
  const sizeClasses = {
    sm: "p-2 py-1 text-xs rounded-md",
    md: "p-4 py-2 text-sm rounded-lg",
    lg: "p-6 py-3 text-base rounded-lg",
  };

  const variantClasses = {
    primary: "border-[#eef5fc] bg-[var(--btn-bg-color)] hover:bg-[var(--btn-bg-color-hover)]",
    delete: "font-bold border-[#eef5fc] bg-red-800 hover:bg-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`border-2  text-white ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
