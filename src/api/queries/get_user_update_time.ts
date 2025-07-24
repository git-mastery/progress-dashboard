import axios from "axios"
import { useQuery } from "react-query"

export interface UserCommit {
  commit: {
    author: {
      date: string
    }
  }
}

export const getUserUpdateTime = async (userId: number) => {
  try {
    const result = await axios.get<UserCommit[]>(`https://api.github.com/repos/git-mastery/progress/commits?path=students/${userId}.json&sha=tracker&per_page=1`);
    return new Date(result.data[0].commit.author.date);
  } catch {
    return null;
  }
}

export const useGetUserUpdateTimeQuery = (userId: number | undefined) => {
  return useQuery<Date | null>({
    queryKey: ["get-user-update-time", userId],
    queryFn: () => getUserUpdateTime(userId!),
    enabled: userId != null,
  });
}

