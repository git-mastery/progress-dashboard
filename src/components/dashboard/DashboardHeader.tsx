import { HiOutlineExternalLink } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { Link } from "react-router";

interface DashboardHeaderProps {
  username: string;
  onRefresh: () => void;
}

function DashboardHeader({ username, onRefresh }: DashboardHeaderProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-4">Git Mastery Progress Dashboard</h3>
      <div className="mb-6">
        <Link to="/" className="text-gray-500 italic mb-2 flex flex-row gap-2 items-center">
          <IoArrowBack className="inline-block" /> Back to search
        </Link>
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-4xl font-bold">@{username}</h1>
            <a
              target="_blank"
              className="hover:cursor-pointer text-gray-500"
              href={`https://github.com/${username}`}
            >
              <HiOutlineExternalLink size={24} />
            </a>
          </div>
          <button type="button" className="hover:cursor-pointer" onClick={onRefresh}>
            <MdOutlineRefresh size={24} color="text-gray-500" />
          </button>
        </div>
        <p className="text-gray-700 font-semibold">
          Find your progress for the various Git Mastery exercises.
        </p>
        <p className="text-gray-700">
          To view all exercises, visit the{" "}
          <a
            className="text-blue-800 underline"
            href="https://git-mastery.github.io/exercises-directory"
          >
            exercises directory
          </a>
          .
        </p>
        <p className="mt-2 italic">
          If there is a discrepancy, open a ticket with the Git-Mastery team{" "}
          <a className="text-blue-800 underline" href="https://github.com/git-mastery/git-mastery">
            here
          </a>
        </p>
      </div>
    </section>
  );
}

export default DashboardHeader;
