import { useGetExercisesQuery } from "@/api/queries/get_exercises";
import { useGetUserQuery } from "@/api/queries/get_user";
import { useGetUserProgressQuery } from "@/api/queries/get_user_progress";
import {
  DashboardHeader,
  ExerciseTable,
  StatusMessage,
} from "@/components/dashboard";
import { EXERCISES_DIRECTORY_URL, ExerciseStatus } from "@/constants";
import Spinner from "@/components/ui/Spinner";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useQueryClient } from "react-query";

type UserProblemSetStatus = string;

function DashboardPage() {
  const { username } = useParams();

  const { data: user, isLoading: isUserLoading } = useGetUserQuery(username);

  const {
    data: userProgress,
    isLoading: isUserProgressLoading,
    isFetching: isUserProgressFetching,
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
        (progress.get(up.exercise_name) !== ExerciseStatus.COMPLETED &&
          progress.get(up.exercise_name) !== ExerciseStatus.SUCCESSFUL) &&
        (up.status === ExerciseStatus.SUCCESSFUL || up.status === ExerciseStatus.COMPLETED)
      ) {
        // Take any success
        progress.set(up.exercise_name, up.status);
      }
    }

    return progress;
  }, [userProgress, isUserProgressLoading]);

  const { data: exercises, isLoading: isProblemSetsLoading } = useGetExercisesQuery();

  const queryClient = useQueryClient();
  const refreshUserProgress = useCallback(async () => {
    await queryClient.invalidateQueries(["get-user-progress", user?.login]);
  }, [queryClient, user?.login]);

  const isLoading = useMemo(() => {
      return (
        isUserLoading ||
        isUserProgressLoading ||
        isUserProgressFetching ||
        isProblemSetsLoading
      );
    }, [
      isUserLoading,
      isUserProgressLoading,
      isUserProgressFetching,
      isProblemSetsLoading
    ]);

  // Dynamically render content based on data availability
  const renderContent = useCallback(() => {
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

    if (exercises == null || exercises.length === 0) {
      return (
        <StatusMessage
          buttonText="Go to exercises directory ↗"
          buttonHref={EXERCISES_DIRECTORY_URL}
          variant="primary"
          external
        >
          <p>No exercises available</p>
        </StatusMessage>
      );
    }

    return (
      <ExerciseTable
        exercises={exercises}
        progress={parsedUserProgress}
      />
    );
  }, [isLoading, user, userProgress, exercises, parsedUserProgress, username]);

  return (
    <div className="my-16 mx-auto lg:w-[80%] xl:w-[70%] 2xl:w-[60%] w-[85%]">
      <DashboardHeader username={username!} onRefresh={refreshUserProgress} />
      <div>{renderContent()}</div>
    </div>
  );
}

export default DashboardPage;
