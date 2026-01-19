import { DASHBOARD_LINKS, DashboardLinkType } from "@/constants/dashboard";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  username: string;
  onRefresh: () => void;
}

function DashboardHeaderExternalLinks({
  links,
}: {
  links: DashboardLinkType[];
}) {
  const linkClassName =
    "text-blue-600 mb-2 flex flex-row gap-2 items-center text-sm underline";

  return (
    <div className="flex flex-row justify-center gap-2 items-center">
      {links.map((link, index) => (
        <span key={link.label} className="flex flex-row gap-2 items-center">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {link.label}
          </a>
          {index < links.length - 1 && (
            <span className="text-gray-400 mb-2">|</span>
          )}
        </span>
      ))}
    </div>
  );
}

function DashboardHeaderToolbar({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex flex-row justify-between items-center mb-8 text-gray-500">
      <nav>
        <Button variant="ghost" asChild>
          <Link to="/" className="flex flex-row gap-2 items-center text-sm">
            <IoArrowBack size={20} />
            Back to change user
          </Link>
        </Button>
      </nav>
      <Button
        variant="ghost"
        onClick={onRefresh}
        aria-label="Refresh progress data"
      >
        <MdOutlineRefresh size={20} />
        Refresh
      </Button>
    </div>
  );
}

function DashboardHeaderNote() {
  return (
    <div className="text-center text-gray-600 italic mb-4 text-sm">
      <p>
      Progress shown below <span className="font-bold">might not include changes in the last 5 minutes</span>, as there is a slight delay in progress data propagating through GitHub. 
      </p>
      <p>
        See {" "}
      <a
        href="https://git-mastery.org/faq/index.html#faq-why-is-the-dashboard-not-showing-my-latest-progress"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        this FAQ
      </a>
      {" "} for further troubleshooting.
      </p>
    </div>
  );
}

function DashboardHeader({ username, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="mb-6">
      <DashboardHeaderToolbar onRefresh={onRefresh} />
      <h1 className="text-3xl font-bold mb-4 text-center">
        Git Mastery Progress Dashboard for{" "}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 gap-2 items-center hover:underline"
        >
          @{username}
        </a>
      </h1>
      <DashboardHeaderNote />
      <DashboardHeaderExternalLinks links={DASHBOARD_LINKS} />
    </header>
  );
}

export default DashboardHeader;
