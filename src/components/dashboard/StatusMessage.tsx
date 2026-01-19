import { Link } from "react-router";
import { Button } from "@/components/ui/button";

type StatusVariant = "destructive" | "default";

interface StatusMessageProps extends React.PropsWithChildren {
  buttonText: string;
  buttonHref: string;
  variant?: StatusVariant;
  external?: boolean;
}

const textStyles: Record<StatusVariant, string> = {
  destructive: "text-red-700",
  default: "",
};

function StatusMessage({
  children,
  buttonText,
  buttonHref,
  variant = "default",
  external = false,
}: StatusMessageProps) {
  return (
    <div className="text-center">
      <div className={textStyles[variant]}>{children}</div>
      <div className="mt-4">
        {external ? (
          <Button 
            asChild 
            className="rounded-sm font-semibold"
            variant={variant}
          >
            <a 
              href={buttonHref} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {buttonText}
            </a>
          </Button>
        ) : (
          <Button 
            asChild 
            className="rounded-sm font-semibold"
            variant={variant}
          >
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
