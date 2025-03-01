import axios from "axios"
import { useQuery } from "react-query"

export interface ProblemSet {
  id: number;
  name: string;
  html_url: string;
  forks_count: number;
  topics: string[];
}

export const getProblemSets = async () => {
  try {
    const result = await axios.get<ProblemSet[]>("https://raw.githubusercontent.com/git-mastery/problems-directory/refs/heads/main/problems.json");
    return result.data;
  } catch {
    return [];
  }
}

export const useGetProblemSetsQuery = () => {
  return useQuery<ProblemSet[]>({
    queryKey: ["get-problem-sets"],
    queryFn: () => getProblemSets(),
  });
}

