import { BASE_URL, ExerciseStatus } from "@/constants";
import { Exercise } from "@/types/exercise";

interface ExerciseTableProps {
  exercises: Exercise[];
  progress: Map<string, string>;
}

function getStatusDisplay(status: string | undefined): { text: string; icon: string } {
  switch (status) {
    case undefined: // Needed for TypeScript strictness
    case null:  
      return { text: "Not Started", icon: "⚪" };
    case ExerciseStatus.COMPLETED:
    case ExerciseStatus.SUCCESSFUL: // SUCCESSFUL is for backwards compatibility
      return { text: "Completed", icon: "✅" };
    case ExerciseStatus.INCOMPLETE:
      return { text: "Incomplete", icon: "⏳" };
    case ExerciseStatus.ERROR:
      return { text: "Error", icon: "❌" };
    default:
      return { text: status, icon: "🔄" };
  }
}

function ExerciseContextLabel({ exercise }: { exercise: Exercise }) {
  const linkClass = "text-blue-600 hover:underline";
  const lessonLink = `${BASE_URL}/${exercise.parentLesson.path}`;

  if (exercise.detour) {
    const detourLink = `${BASE_URL}/${exercise.detour.lesson.path}`;
    return (
      <span className="text-gray-500 text-sm ml-2">
        (in <a href={detourLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {exercise.parentLesson.title} &#8594; Detour: {exercise.detour.title}
        </a>)
      </span>
    );
  }
  return (
    <span className="text-gray-500 text-sm ml-2">
      (in <a href={lessonLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {exercise.parentLesson.title}
      </a>)
    </span>
  );
}

function ExerciseTable({ exercises, progress }: ExerciseTableProps) {
  return (
    <table className="table-fixed w-full bg-white border border-gray-300 rounded-sm">
      <thead>
        <tr>
          <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">
            Exercise
          </th>
          <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left w-40">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => {
          const status = getStatusDisplay(progress.get(exercise.identifier));
          const lessonPath = exercise.detour?.lesson.path ?? exercise.parentLesson.path;
          return (
            <tr key={exercise.key}>
              <td className="border border-gray-300 px-4 py-2 text-left">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${BASE_URL}/${lessonPath}/exercise-${exercise.identifier}`}
                >
                  <code className="underline text-blue-800">{exercise.identifier}</code>
                </a>
                <ExerciseContextLabel exercise={exercise} />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                <span className="mr-2">{status.icon}</span>
                {status.text}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ExerciseTable;
