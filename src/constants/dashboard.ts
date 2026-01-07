import { BASE_URL } from ".";

export interface DashboardLinkType {
  label: string;
  href: string;
}

export const DASHBOARD_LINKS: DashboardLinkType[] = [
  {
    label: "Exercises directory",
    href: `${BASE_URL}/exercises-directory`,
  },
  {
    label: "Report a bug",
    href: "https://github.com/git-mastery/git-mastery/issues",
  }
];
