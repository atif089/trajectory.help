import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen w-screen text-base">
      <h1 className="text-3xl font-bold">📈 Trajectory.help ⬆️↗️</h1>
      <p className="text-md mb-4 font-semibold">Your Career, On Track</p>

      <p className="mb-8">
        Trajectory.help is your personal career growth toolkit. Whether you’re job hunting for the first time or aiming
        for your next big role, we help you:
      </p>

      <ul className="mb-8 text-left list-disc">
        <li>Build a polished, recruiter-ready CV that stands out</li>
        <li>Tailor your resume to any job description in seconds</li>
        <li>Prepare for interviews with SMART structured storytelling</li>
        <li>Track your accomplishments and build a promotion-ready work log</li>
      </ul>

      <p>No more guesswork. No more outdated templates. Just a clear path to where you want to go.</p>

      <Link to="/lab">
        <button className="mt-8 px-4 py-2 rounded-lg border-2 border-[#eef5fc] border-solid bg-violet-500 text-white ">
          Enter the Lab
        </button>
      </Link>
    </div>
  );
}
