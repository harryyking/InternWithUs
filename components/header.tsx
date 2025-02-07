
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

export function Header() {

  return (
    <header
    className="relative bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-lg font-semibold text-primary">
            Work Dey Here
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Log in</Button>
          <Button>Post job</Button>
        </div>
      </div>
    </header>
  )
}

