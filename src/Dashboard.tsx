import { useCallback, useMemo } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { Link, useParams } from "react-router";
import { Exercise, useGetExercisesQuery } from "./api/queries/get_exercises";
import { useGetUserQuery } from "./api/queries/get_user";
import { useGetUserProgressQuery } from "./api/queries/get_user_progress";
import Spinner from "./components/Spinner";

type UserProblemSetStatus = string;

function Dashboard() {
  const { username } = useParams();

  const {
    data: user,
    isLoading: isUserLoading,
  } = useGetUserQuery(username);

  const {
    data: userProgress,
    isLoading: isUserProgressLoading,
    isRefetchError: isUserProgressRefetching,
    refetch: refetchUserProgress,
  } = useGetUserProgressQuery(user?.login);

  const parsedUserProgress = useMemo(() => {
    if (isUserProgressLoading || userProgress == null) {
      return new Map<string, UserProblemSetStatus>();
    }

    const progress = new Map<string, UserProblemSetStatus>();
    for (const up of userProgress) {
      if (!progress.has(up.exercise_name)) {
        progress.set(up.exercise_name, up.status)
      } else if ((progress.get(up.exercise_name) !== "SUCCESSFUL" || progress.get(up.exercise_name) !== "Completed") && (up.status === "SUCCESSFUL" || up.status === "Completed")) {
        // Take any success
        progress.set(up.exercise_name, up.status)
      }
    }

    return progress
  }, [userProgress, isUserProgressLoading])

  const {
    data: exercises,
    isLoading: isProblemSetsLoading,
  } = useGetExercisesQuery();

  const exerciseGroups = useMemo(() => {
    if (isProblemSetsLoading || exercises == null) {
      return new Map<string, Exercise[]>();
    }

    const repoGroups = new Map<string, Exercise[]>();
    for (const exercise of exercises) {
      for (const tag of exercise.tags) {
        if (parsedUserProgress.has(exercise.exercise_name)) {
          if (!repoGroups.has(tag)) {
            repoGroups.set(tag, [])
          }
          repoGroups.get(tag)!.push(exercise)
        }
      }
    }

    const sortedGroups = new Map([...repoGroups.entries()].sort())
    return sortedGroups
  }, [exercises, isProblemSetsLoading, parsedUserProgress])

  const refreshUserProgress = useCallback(async () => {
    await refetchUserProgress()
  }, [refetchUserProgress])

  return (
    <div className="lg:w-[40%] my-16 mx-auto md:w-[60%] w-[80%]">
      <h3 className="text-2xl font-bold mb-4">Git Mastery Progress Dashboard</h3>
      <div className="mb-6">
        <Link to="/" className="text-gray-500 italic mb-2 flex flex-row gap-2 items-center"><IoArrowBack className="inline-block" /> Back to search</Link>
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-4xl font-bold">@{username}</h1>
            <a target="_blank" className="hover:cursor-pointer text-gray-500" href={`https://github.com/${username}`}>
              <HiOutlineExternalLink size={24} />
            </a>
          </div>
          <button type="button" className="hover:cursor-pointer" onClick={refreshUserProgress}><MdOutlineRefresh size={24} color="text-gray-500" /></button>
        </div>
        <p className="text-gray-700 font-semibold">Find your progress for the various Git Mastery exercises.</p>
        <p className="text-gray-700">To view all exercises, visit the <a className="text-blue-800 underline" href="https://git-mastery.github.io/exercises-directory">exercises directory</a>.</p>
        <p className="mt-2 italic">
            If there is a discrepancy, open a ticket with the Git-Mastery team <a className="text-blue-800 underline" href="https://github.com/git-mastery/git-mastery">here</a>
          </p>
      </div>
      <div>
        {(isUserLoading || isUserProgressLoading || isUserProgressRefetching || isProblemSetsLoading) ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          user == null ? (
            <div className="text-center">
              <p className="mb-4 text-red-700">User <strong>{username}</strong> does not exist</p>
              <Link to="/" className="hover:cursor-pointer border-1 border-red-700 bg-red-700 text-white rounded-sm px-4 py-2 font-semibold">← Return to search</Link>
            </div>
          ) : userProgress == null ? (
          <div className="text-center">
            <p className="mb-4 text-red-700">
              No progress repository found for <strong>{username}</strong>.
            </p>
            <Link
              to="/"
              className="hover:cursor-pointer border-1 border-red-700 bg-red-700 text-white rounded-sm px-4 py-2 font-semibold"
            >
              ← Return to search
            </Link>
          </div>
        ) : (
            exerciseGroups.size === 0 ? (
              <div className="text-center">
                <p className="mb-4">You have not completed any exercises yet</p>
                <a href="https://git-mastery.github.io/exercises-directory" target="_blank" className="hover:cursor-pointer border-1 border-blue-800 bg-blue-800 text-white rounded-sm px-4 py-2 font-semibold">Go to exercises directory ↗</a>
              </div>
            ) : (
              Array.from(exerciseGroups)
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
                            .filter(exercise => parsedUserProgress.has(exercise.exercise_name))
                            .map((exercise, idx) => (
                              <tr key={idx}>
                                <td className="border border-gray-300 px-4 py-2 text-left"><a target="_blank" href={`https://git-mastery.github.io/exercises/${exercise.exercise_name.replace("-", "_")}`}><code className="underline text-blue-800">{exercise.exercise_name}</code></a></td>
                                <td className="border border-gray-300 px-4 py-2 text-left">{parsedUserProgress.get(exercise.exercise_name)}</td>
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
