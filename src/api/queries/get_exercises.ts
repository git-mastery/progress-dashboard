import { DetourInfo, Exercise, LessonInfo } from "@/types/exercise";
import axios from "axios"
import { useQuery } from "react-query"

export interface ExerciseRaw {
  lesson?: LessonInfo;
  detour?: DetourInfo;
  identifier: string;
  wip?: number;
}

type ExercisesResponse = Record<string, ExerciseRaw>;

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const result = await axios.get<ExercisesResponse>(
      "https://git-mastery.github.io/exercises-directory/exercises.json"
    );

    // TODO: Sorting of exercises, but not needed now as API returns exercises in order
    const exercises: Exercise[] = [];
    for (const [key, value] of Object.entries(result.data)) {
      // Filter WIP exercises at API layer since they're not meant to be visible
      // This is more performant since we only filter once at fetch time, not on every render
      if (value?.wip === 1) {
        continue;
      }
      
      const lesson = value.lesson ?? value.detour?.lesson;
      if (!lesson) {
        continue;
      }
      
      exercises.push({
        key,
        identifier: value.identifier,
        lesson,
        detour: value.detour,
      });
    }

    return exercises;
  } catch {
    return [];
  }
}

export const useGetExercisesQuery = () => {
  return useQuery<Exercise[]>({
    queryKey: ["get-exercises"],
    queryFn: () => getExercises(),
  });
}
