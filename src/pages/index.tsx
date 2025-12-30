import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("");

  const usernameInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value)
  }, [])

  const searchUser = useCallback(() => {
    navigate(`/dashboard/${username}`)
  }, [navigate, username])

  const isSearchDisabled = useMemo(() => {
    return username.trim() === ""
  }, [username])

  return (
    <div className="lg:w-[40%] my-28 mx-auto md:w-[60%] w-[80%]">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">Git Mastery Progress Dashboard</h1>
        <p className="text-gray-700 font-semibold">Enter your Github username to find your progress!</p>
      </div>
      <div className="flex flex-row border w-full rounded-sm">
        <div className="flex items-center justify-center p-4 border-r border-r-gray-700">
          <span className="font-bold">@</span>
        </div>
        <input onChange={usernameInput} autoFocus className="font-semibold w-full px-4 focus:outline-none" placeholder="Your Github username" type="text" />
      </div>
      <div className="text-center mt-4">
        <button type="button" onClick={searchUser} disabled={isSearchDisabled} className="enabled:hover:cursor-pointer enabled:hover:bg-gray-600 enabled:hover:text-white transition border-1 rounded-sm px-4 py-2 font-semibold disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">View Progress →</button>
      </div>
    </div>
  )
}

export default HomePage;
