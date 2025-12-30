import { Link } from "react-router";

type ButtonVariant = "error" | "primary";

interface StatusMessageProps extends React.PropsWithChildren {
  buttonText: string;
  buttonHref: string;
  variant?: ButtonVariant;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  error: "border-red-700 bg-red-700 text-white",
  primary: "border-blue-800 bg-blue-800 text-white",
};

const textStyles: Record<ButtonVariant, string> = {
  error: "text-red-700",
  primary: "",
};

function StatusMessage({
  children,
  buttonText,
  buttonHref,
  variant = "error",
  external = false,
}: StatusMessageProps) {
  const buttonClasses = `hover:cursor-pointer border-1 ${variantStyles[variant]} rounded-sm px-4 py-2 font-semibold`;

  return (
    <div className="text-center">
      <div className={textStyles[variant]}>{children}</div>
      <div className="mt-4">
        {external ? (
          <a 
            href={buttonHref} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={buttonClasses}
          >
            {buttonText}
          </a>
        ) : (
          <Link to={buttonHref} className={buttonClasses}>
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}

export default StatusMessage;
