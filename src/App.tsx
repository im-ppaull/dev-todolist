import { useUser } from "@clerk/clerk-react";
import Button from "./components/ui/Button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const { isSignedIn, user } = useUser();
  const userCount = useQuery(api.users.getUserCount, { online: false });
  const onlineUserCount = useQuery(api.users.getUserCount, { online: true });
  const registerUser = useMutation(api.users.registerUser);
  const setUserOnlineStatus = useMutation(api.users.setUserOnlineStatus);
  const todoList = useQuery(api.todos.list, {})?.list;

  useEffect(() => {
    if (isSignedIn && user?.id) {
      void registerUser();
      void setUserOnlineStatus({ status: true });

      if (!localStorage.getItem("rawUserId")) {
        localStorage.setItem("rawUserId", user.id);
      }
    } else {
      const clerkId = localStorage.getItem("rawUserId");

      if (clerkId) {
        void setUserOnlineStatus({ status: false, clerkId });
      }
    }
  }, [isSignedIn, user?.id, registerUser, setUserOnlineStatus]);

  return (
    <div>
      <div>
        <div>
          <p className="font-bold">DEV TO-DO-LIST</p>
          <p>
            An intuitive online TO-DO-LIST application designed for developers and productivity enthusiasts. 
            Keep your tasks organized and secure—your list is safely stored on this website. 
            Collaborate with others by sharing your lists, or chat with participants to coordinate tasks and ideas. 
            Perfect for managing personal projects, team tasks, or study plans.
            Whether you’re managing a personal project, planning your daily routine, or collaborating with a team, this tool helps you stay on track.<br/>
            Found a bug or have a suggestion? Feel free to contact me on <a href="https://github.com/im-ppaull" className="underline">GitHub</a> — your feedback helps improve the platform for everyone!
          </p>
          <p className="text-end text-sm">- PPaull</p>
        </div>

        <div>
          <p className="stretch-min tracking-tight font-bold">
            --- Web statistics ---
          </p>

          <div className="w-fit outline-2 px-5 py-2 my-3 flex items-center gap-1">
            <StatisticBlock label="USERS" value={userCount} />
            <p className="text-xl font-bold">:</p>
            <StatisticBlock label="ONLINE" value={onlineUserCount} />
            <p className="text-xl font-bold">:</p>
            <StatisticBlock label="TASKS" value={todoList?.length} />
          </div>
        </div>

        <Link to="/list">
         <Button className="mt-3 hover:bg-emerald-300/50">Check List</Button>
        </Link>

        <div className="mt-5">
          <p className="stretch-min tracking-tight font-bold">
            --- How It Works ---
          </p>

          <p className="leading-6 tracking-tight">
            • Create Unlimited Tasks: <i>Add as many tasks as you need — no limits or restrictions.</i><br/>
            • Optional Sign-In for Saving: <i>You can start creating lists immediately without signing in. Sign in to save your tasks securely to the database.</i><br/>
            • Chat & Collaborate: <i>Signing in is required to chat and collaborate with other participants in real time.</i><br/>
            • Real-Time Chat: <i>Communicate directly with other participants, discuss tasks, and stay updated on shared lists.</i><br/>
            • Flexible & Easy-to-Use: <i>Designed to be simple yet powerful—drag, edit, and manage your tasks without any hassle.</i><br/>
            • Cross-Device Access: <i></i>Access your tasks anywhere, anytime — on desktop, tablet, or mobile.
          </p>
        </div>
      </div>
    </div>
  );
}

const StatisticBlock = ({ label, value }: { label: string; value?: number }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-2xl stretch-min tracking-tight">{Number(value || 0).toLocaleString()}</p>
      <p className="text-xs stretch-min tracking-tight">{label}</p>
    </div>
  );
}

/*
function SignInForm() {
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto">
      <p>Log in to see the numbers</p>
      <SignInButton mode="modal">
        <button className="bg-dark dark:bg-light text-light dark:text-dark text-sm px-4 py-2 rounded-md border-2">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="bg-dark dark:bg-light text-light dark:text-dark text-sm px-4 py-2 rounded-md border-2">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p>Welcome {viewer ?? "Anonymous"}!</p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <button
          className="bg-dark dark:bg-light text-light dark:text-dark text-sm px-4 py-2 rounded-md border-2"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}
      </p>
      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          src/App.tsx
        </code>{" "}
        to change your frontend
      </p>
      <div className="flex flex-col">
        <p className="text-lg font-bold">Useful resources:</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing
            collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
      <a href={href} className="text-sm underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  );
}
*/
