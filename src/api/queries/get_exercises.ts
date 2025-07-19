import axios from "axios"
import { useQuery } from "react-query"

export interface Exercise {
  exercise_name: string;
  tags: string[];
}

export const getExercises = async () => {
  try {
    const result = await axios.get<Exercise[]>("https://raw.githubusercontent.com/git-mastery/exercises/refs/heads/gh-pages/exercises.json");
    return result.data;
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

