import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">GhanaIntern</h3>
            <p>Connecting students with exciting internship opportunities across Ghana.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-blue-600">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <p>Email: info@ghanaintern.com</p>
            <p>Phone: +233 XX XXX XXXX</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; {new Date().getFullYear()} GhanaIntern. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

