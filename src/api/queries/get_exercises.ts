import { EXERCISES_DIRECTORY_URL } from "@/constants";
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

/**
 * Parses a lesson title like to extract tour (T) and lesson (L) numbers.
 */
function parseExerciseOrder(title: string): { tour: number; lesson: number } | null {
  const match = title.match(/^T(\d+)L(\d+)/);
  if (!match) {
    return null;
  }
  return {
    tour: parseInt(match[1], 10),
    lesson: parseInt(match[2], 10),
  };
}

/**
 * Compares two exercises for sorting: by tour (T) first, then by lesson (L).
 */
function compareExercises(a: Exercise, b: Exercise): number {
  const orderA = parseExerciseOrder(a.parentLesson.title);
  const orderB = parseExerciseOrder(b.parentLesson.title);

  if (!orderA && !orderB) return 0;
  if (!orderA) return 1;
  if (!orderB) return -1;

  if (orderA.tour !== orderB.tour) {
    return orderA.tour - orderB.tour;
  }
  return orderA.lesson - orderB.lesson;
}

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const result = await axios.get<ExercisesResponse>(
      `${EXERCISES_DIRECTORY_URL}/exercises.json`
    );

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
        parentLesson: lesson,
        detour: value.detour,
      });
    }

    return exercises.sort(compareExercises);
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
