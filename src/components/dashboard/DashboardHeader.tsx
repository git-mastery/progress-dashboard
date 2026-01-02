import { Link } from "react-router";

interface DashboardHeaderProps {
  username: string;
  onRefresh: () => void;
}

interface LinkProps {
  label: string;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
}

const getDashboardLinks = (onRefresh: () => void): LinkProps[] => [
  {
    label: "Change user",
    href: "/",
    isExternal: false,
  },
  {
    label: "Exercises directory",
    href: "https://git-mastery.github.io/exercises-directory",
    isExternal: true,
  },
  {
    label: "Report a bug",
    href: "https://github.com/git-mastery/git-mastery/issues",
    isExternal: true,
  },
  {
    label: "Refresh",
    onClick: onRefresh,
  }
];

function DashboardHeaderLinks({ links }: { links: LinkProps[] }) {
  const linkClassName = "text-blue-600 mb-2 flex flex-row gap-2 items-center text-sm underline";
  
  return (
    <div className="flex flex-row justify-center gap-2 items-center">
      {links.map((link, index) => (
        <span key={link.label} className="flex flex-row gap-2 items-center">
          {link.onClick ? (
            <button
              type="button"
              onClick={link.onClick}
              className={`${linkClassName} hover:cursor-pointer`}
            >
              {link.label}
            </button>
          ) : link.isExternal ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
              {link.label}
            </a>
          ) : (
            <Link to={link.href!} className={linkClassName}>
              {link.label}
            </Link>
          )}
          {index < links.length - 1 && <span className="text-gray-400 mb-2">|</span>}
        </span>
      ))}
    </div>
  )
}

function DashboardHeader({ username, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="mb-6">
      <h3 className="text-3xl font-bold mb-4 text-center">Git Mastery Progress Dashboard for @{username}</h3>
      <DashboardHeaderLinks links={getDashboardLinks(onRefresh)} />
    </header>
  );
}

export default DashboardHeader;
