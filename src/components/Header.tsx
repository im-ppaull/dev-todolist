import { Authenticated, Unauthenticated } from "convex/react"
import Button from "./ui/Button"
import { SignInButton, UserButton } from "@clerk/clerk-react"

const Header = () => {
    return (
      <header className="flex justify-evenly items-center my-4 font-semibold">
        <p>DEV TO-DO-LIST</p>
        <p>[Profile]</p>
        <Unauthenticated>
          <SignInButton mode="modal">
            <Button className="hover:bg-amber-200/60">Sign In</Button>
          </SignInButton>
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
    </header>
    )
}

export default Header