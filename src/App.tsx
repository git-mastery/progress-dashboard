import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null);

  const searchUser = useCallback(() => {
    navigate(`/dashboard/${usernameRef?.current?.value}`)
  }, [navigate, usernameRef])

  return (
    <div className="w-[40%] my-28 mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">Git Mastery Progress Dashboard</h1>
        <p className="text-gray-700 font-semibold">Enter your Github username to find your progress!</p>
      </div>
      <div className="flex flex-row border w-full rounded-sm">
        <div className="flex items-center justify-center p-4 border-r border-r-gray-700">
          <span className="font-bold">@</span>
        </div>
        <input ref={usernameRef} className="font-semibold w-full px-4 focus:outline-none" placeholder="Your Github username" type="text" />
      </div>
      <div className="text-center mt-4">
        <button type="button" onClick={searchUser} className="hover:cursor-pointer hover:bg-gray-600 hover:text-white transition border-1 rounded-sm px-4 py-2 font-semibold">View Progress →</button>
      </div>
    </div>
  )
}

export default App
