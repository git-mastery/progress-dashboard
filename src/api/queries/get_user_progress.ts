import axios from "axios"
import { useQuery } from "react-query"

export interface UserProgress {
  exercise_name: string;
  status: string;
}

export const getUserProgress = async (username: string) => {
  try {
    const encodedUsername = encodeURIComponent(username);
    const result = await axios.get<UserProgress[]>(`https://raw.githubusercontent.com/${encodedUsername}/${encodedUsername}-gitmastery-progress/refs/heads/main/progress.json`);
    return result.data;
  } catch {
    return null;
  }
}

export const useGetUserProgressQuery = (username: string | undefined) => {
  return useQuery<UserProgress[] | null>({
    queryKey: ["get-user-progress", username],
    queryFn: () => getUserProgress(username!),
    enabled: username != undefined,
  });
}

