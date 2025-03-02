import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { ProblemSet, useGetProblemSetsQuery } from "./api/queries/get_problem_sets";
import { useGetUserQuery } from "./api/queries/get_user";
import { useGetUserProgressQuery } from "./api/queries/get_user_progress";
import Spinner from "./components/Spinner";

type UserProblemSetStatus = string;

function Dashboard() {
  let { username } = useParams();

  const {
    data: user,
    isLoading: isUserLoading,
  } = useGetUserQuery(username);

  const {
    data: userProgress,
    isLoading: isUserProgressLoading,
  } = useGetUserProgressQuery(user?.id);

  const parsedUserProgress = useMemo(() => {
    if (isUserProgressLoading || userProgress == null) {
      return new Map<string, UserProblemSetStatus>();
    }

    const progress = new Map<string, UserProblemSetStatus>();
    for (const up of userProgress) {
      if (!progress.has(up.exercise_name)) {
        progress.set(up.exercise_name, up.status)
      } else if (progress.get(up.exercise_name) !== "SUCCESSFUL" && up.status === "SUCCESSFUL") {
        // Take any success
        progress.set(up.exercise_name, up.status)
      }
    }

    return progress
  }, [userProgress, isUserProgressLoading])

  const {
    data: problemSets,
    isLoading: isProblemSetsLoading,
  } = useGetProblemSetsQuery();

  const problemSetGroups = useMemo(() => {
    if (isProblemSetsLoading || problemSets == null) {
      return new Map<string, ProblemSet[]>();
    }

    const repoGroups = new Map<string, ProblemSet[]>();
    for (const repo of problemSets) {
      for (const topic of repo.topics) {
        if (topic !== "problem-set") {
          if (parsedUserProgress.has(repo.name)) {
            if (!repoGroups.has(topic)) {
              repoGroups.set(topic, [])
            }
            repoGroups.get(topic)!.push(repo)
          }
        }
      }
    }

    const sortedGroups = new Map([...repoGroups.entries()].sort())
    return sortedGroups
  }, [problemSets, isProblemSetsLoading, parsedUserProgress])

  return (
    <div className="lg:w-[40%] my-16 mx-auto md:w-[60%] w-[80%]">
      <h3 className="text-2xl font-bold mb-4">Git Mastery Progress Dashboard</h3>
      <div className="mb-6">
        <Link to="/" className="text-gray-500 italic mb-2">← Back to search</Link>
        <h1 className="text-4xl font-bold mb-4">@{username}</h1>
        <p className="text-gray-700 font-semibold">Find your progress for the various Git Mastery problem sets.</p>
        <p className="text-gray-700">To view all problem sets, visit the <a className="text-blue-800 underline" href="https://github.com/git-mastery/problems-directory">problems directory</a>.</p>
      </div>
      <div>
        {(isUserLoading || isUserProgressLoading || isProblemSetsLoading) ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          user == null ? (
            <div className="text-center">
              <p className="mb-4 text-red-700">User <strong>{username}</strong> does not exist</p>
              <Link to="/" className="hover:cursor-pointer border-1 border-red-700 bg-red-700 text-white rounded-sm px-4 py-2 font-semibold">← Return to search</Link>
            </div>
          ) : (
            problemSetGroups.size === 0 ? (
              <div className="text-center">
                <p className="mb-4">You have not completed any problem sets yet</p>
                <a href="https://github.com/git-mastery/problems-directory" target="_blank" className="hover:cursor-pointer border-1 border-blue-800 bg-blue-800 text-white rounded-sm px-4 py-2 font-semibold">Go to problems directory ↗</a>
              </div>
            ) : (
              Array.from(problemSetGroups)
                .map(([key, value]) => {
                  return (
                    <div key={key} className="not-last:mb-4">
                      <h2 className="text-2xl font-bold mb-2"><code>{key}</code></h2>
                      <table className="table-fixed w-full bg-white border border-gray-300 rounded-sm">
                        <thead>
                          <tr>
                            <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Exercise name</th>
                            <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Completion Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {value
                            .filter(problemSet => parsedUserProgress.has(problemSet.name))
                            .map(problemSet => (
                              <tr key={problemSet.id}>
                                <td className="border border-gray-300 px-4 py-2 text-left"><a target="_blank" href={problemSet.html_url}><code className="underline text-blue-800">{problemSet.name}</code></a></td>
                                <td className="border border-gray-300 px-4 py-2 text-left">{parsedUserProgress.get(problemSet.name)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )
                })
            )
          )
        )}
      </div>
    </div >
  )
}

export default Dashboard;
