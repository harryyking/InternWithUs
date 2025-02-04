import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            GhanaIntern
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/internships" className="hover:underline">
                Internships
              </Link>
            </li>
            <li>
              <Link href="/apply" className="hover:underline">
                Apply
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

