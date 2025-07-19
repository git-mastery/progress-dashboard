import axios from "axios"
import { useQuery } from "react-query"

export interface UserProgress {
  exercise_name: string;
  status: string;
}

export const getUserProgress = async (userId: number) => {
  try {
    const result = await axios.get<UserProgress[]>(`https://raw.githubusercontent.com/git-mastery/progress/refs/heads/tracker/students/${userId}.json`);
    return result.data;
  } catch {
    return null;
  }
}

export const useGetUserProgressQuery = (userId: number | undefined) => {
  return useQuery<UserProgress[] | null>({
    queryKey: ["get-user-progress", userId],
    queryFn: () => getUserProgress(userId!),
    enabled: userId != null,
  });
}

