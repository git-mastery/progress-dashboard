import { Exercise, useGetExercisesQuery } from "@/api/queries/get_exercises";
import { useGetUserQuery } from "@/api/queries/get_user";
import { useGetUserProgressQuery } from "@/api/queries/get_user_progress";
import {
  DashboardHeader,
  ExerciseGroupTable,
  StatusMessage,
} from "@/components/dashboard";
import Spinner from "@/components/ui/Spinner";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router";

type UserProblemSetStatus = string;

function page() {
  const { username } = useParams();

  const { data: user, isLoading: isUserLoading } = useGetUserQuery(username);

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
        progress.set(up.exercise_name, up.status);
      } else if (
        (progress.get(up.exercise_name) !== "SUCCESSFUL" ||
          progress.get(up.exercise_name) !== "Completed") &&
        (up.status === "SUCCESSFUL" || up.status === "Completed")
      ) {
        // Take any success
        progress.set(up.exercise_name, up.status);
      }
    }

    return progress;
  }, [userProgress, isUserProgressLoading]);

  const { data: exercises, isLoading: isProblemSetsLoading } = useGetExercisesQuery();

  const exerciseGroups = useMemo(() => {
    if (isProblemSetsLoading || exercises == null) {
      return new Map<string, Exercise[]>();
    }

    const repoGroups = new Map<string, Exercise[]>();
    for (const exercise of exercises) {
      for (const tag of exercise.tags) {
        if (parsedUserProgress.has(exercise.exercise_name)) {
          if (!repoGroups.has(tag)) {
            repoGroups.set(tag, []);
          }
          repoGroups.get(tag)!.push(exercise);
        }
      }
    }

    const sortedGroups = new Map([...repoGroups.entries()].sort());
    return sortedGroups;
  }, [exercises, isProblemSetsLoading, parsedUserProgress]);

  const refreshUserProgress = useCallback(async () => {
    await refetchUserProgress();
  }, [refetchUserProgress]);

  const isLoading =
    isUserLoading || isUserProgressLoading || isUserProgressRefetching || isProblemSetsLoading;

  // Dynamically render content based on data availability
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <Spinner />
        </div>
      );
    }

    if (user == null) {
      return (
        <StatusMessage buttonText="← Return to search" buttonHref="/" variant="error">
          <p>User <strong>{username}</strong> does not exist</p>
        </StatusMessage>
      );
    }

    if (userProgress == null) {
      return (
        <StatusMessage buttonText="← Return to search" buttonHref="/" variant="error">
          <p className="mb-2">No progress repository found for <strong>{username}</strong>.</p>
          <p>
            Ensure that you have enabled remote progress tracking using{" "}
            <code className="bg-gray-100 px-2 py-1">gitmastery progress sync on</code> in the
            Git-Mastery app.
          </p>
        </StatusMessage>
      );
    }

    if (exerciseGroups.size === 0) {
      return (
        <StatusMessage
          buttonText="Go to exercises directory ↗"
          buttonHref="https://git-mastery.github.io/exercises-directory"
          variant="primary"
          external
        >
          <p>You have not completed any exercises yet</p>
        </StatusMessage>
      );
    }

    return Array.from(exerciseGroups).map(([groupName, exercises]) => (
      <ExerciseGroupTable
        key={groupName}
        groupName={groupName}
        exercises={exercises}
        progress={parsedUserProgress}
      />
    ));
  };

  return (
    <div className="lg:w-[40%] my-16 mx-auto md:w-[60%] w-[80%]">
      <DashboardHeader username={username!} onRefresh={refreshUserProgress} />
      <div>{renderContent()}</div>
    </div>
  );
}

export default page;
