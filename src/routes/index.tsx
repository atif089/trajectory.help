import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen w-screen text-base ">
      <div className="max-w-[800px] text-lg">
        <h1 className="text-[60px]/[1.5] font-[900]">📈 Trajectory.help</h1>

        <p className="my-8">
          Trajectory.help is your personal career growth toolkit. Whether you’re job hunting for the first time or
          aiming for your next big role, we help you:
        </p>

        <ul className="mb-8 text-left list-disc list-inside">
          <li>Build a polished, recruiter-ready CV that stands out</li>
          <li>Tailor your resume to any job description in seconds</li>
        </ul>

        <p>No more guesswork. No more outdated templates. Just a clear path to where you want to go.</p>

        <Link to="/lab">
          <button className="mt-8 px-4 py-2 rounded-lg border-2 border-[#eef5fc] border-solid bg-violet-500 text-white ">
            Enter the Lab
          </button>
        </Link>
      </div>
    </div>
  );
}
