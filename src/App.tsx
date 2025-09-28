import { useUser } from "@clerk/clerk-react";
import Header from "./components/Header";
import Button from "./components/ui/Button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";

export default function App() {
  const { isSignedIn } = useUser();
  const userCount = useQuery(api.users.getUserCount);
  const registerUser = useMutation(api.users.registerUser);

  useEffect(() => {
    if (isSignedIn) {
      void registerUser();
    }
  }, [isSignedIn, registerUser])

  return (
    <div>
      <Header />

      <div className="container mx-auto mt-10 w-[1110px]">
        <div>
          <p className="font-bold">DEV TO-DO-LIST</p>
          <p>
            An online TO-DO-LIST application. Save your list securily on this website and chat with other participants. If you want you can share your list with others. Feel free to contact me on <a href="https://github.com/im-ppaull" className="underline">GitHub</a> if you find any bugs on this webpage.
          </p>
          <p className="text-end text-sm">- PPaull</p>
        </div>

        <div>
          <p className="stretch-min tracking-tight font-bold">
            --- Web statistics ---
          </p>

          <div className="w-fit outline-2 px-5 py-2 my-3 flex items-center gap-2">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl stretch-min tracking-tight">{userCount}</p>
              <p className="text-xs stretch-min tracking-tight">USERS</p>
            </div>

            <p className="text-bold mb-4 text-xl">:</p>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl stretch-min tracking-tight">{Number(18475).toLocaleString('en-US')}</p>
              <p className="text-xs stretch-min tracking-tight">TASKS</p>
            </div>
          </div>
        </div>

        <Button className="mt-3 hover:bg-emerald-300/50">Check List</Button>

        <div className="mt-5">
          <p className="stretch-min tracking-tight font-bold">
            --- How It Works ---
          </p>

          <p className="leading-6 tracking-tight">
            • Save as many tasks as you wish<br/>
            • No login required to create a list, but sign in to save your list to the database<br/>
            • Required to be logged in to be able to chat with other participants
          </p>
        </div>
      </div>
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
