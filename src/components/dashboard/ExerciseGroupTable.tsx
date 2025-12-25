import { Exercise } from "@/api/queries/get_exercises";

interface ExerciseGroupTableProps {
  groupName: string;
  exercises: Exercise[];
  progress: Map<string, string>;
}

function ExerciseGroupTable({ groupName, exercises, progress }: ExerciseGroupTableProps) {
  const filteredExercises = exercises.filter((exercise) => progress.has(exercise.exercise_name));

  return (
    <div className="not-last:mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <code>{groupName}</code>
      </h2>
      <table className="table-fixed w-full bg-white border border-gray-300 rounded-sm">
        <thead>
          <tr>
            <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">
              Exercise name
            </th>
            <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">
              Completion Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExercises.map((exercise, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 px-4 py-2 text-left">
                <a
                  target="_blank"
                  href={`https://git-mastery.github.io/exercises-directory#exercise-${exercise.exercise_name}`}
                >
                  <code className="underline text-blue-800">{exercise.exercise_name}</code>
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {progress.get(exercise.exercise_name)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExerciseGroupTable;
