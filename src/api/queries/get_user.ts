import axios from "axios"
import { useQuery } from "react-query"

export interface User {
  login: string;
}

export const getUser = async (username: string) => {
  try {
    const encodedUsername = encodeURIComponent(username);
    const user = await axios.get<User>(`https://api.github.com/users/${encodedUsername}`)
    return user.data
  } catch {
    return null
  }
}

export const useGetUserQuery = (username: string | undefined) => {
  return useQuery<User | null>({
    queryKey: ["get-user", username],
    queryFn: () => getUser(username!),
    enabled: username != null,
  })
}

