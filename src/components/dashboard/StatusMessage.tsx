import { Link } from "react-router";
import { Button } from "@/components/ui/button";

type ButtonVariant = "error" | "primary";

interface StatusMessageProps extends React.PropsWithChildren {
  buttonText: string;
  buttonHref: string;
  variant?: ButtonVariant;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  error: "bg-red-700 text-white border-red-700 hover:bg-red-800 hover:border-red-800",
  primary: "bg-blue-800 text-white border-blue-800 hover:bg-blue-900 hover:border-blue-900",
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
  return (
    <div className="text-center">
      <div className={textStyles[variant]}>{children}</div>
      <div className="mt-4">
        {external ? (
          <Button asChild className={`rounded-sm font-semibold ${variantStyles[variant]}`}>
            <a 
              href={buttonHref} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {buttonText}
            </a>
          </Button>
        ) : (
          <Button asChild className={`rounded-sm font-semibold ${variantStyles[variant]}`}>
            <Link to={buttonHref}>
              {buttonText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default StatusMessage;
