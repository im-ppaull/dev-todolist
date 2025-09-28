import { Authenticated, Unauthenticated } from "convex/react"
import Button from "./ui/Button"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

const Header = () => {  
  return (
    <header className="container mx-auto py-4 px-16">
      <nav className="flex items-center gap-8">
        <Link to="/">
          <p className="my-2 font-extrabold uppercase">
            DEV TO-DO-LIST
          </p>
        </Link>

        <ul className="flex ml-auto items-center">
          <li>
            <Link to="/profile">[Profile]</Link>
          </li>
        </ul>

        <div className="ml-auto">
          <Unauthenticated>
            <SignInButton mode="modal">
              <Button className="hover:bg-amber-200/60">Sign In</Button>
            </SignInButton>
          </Unauthenticated>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </nav>
    </header>
  )
}

export default Header