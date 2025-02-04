import Image from "next/image";
import Link from "next/link";
import Header  from "@/components/Header";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Find Your Dream Internship in Ghana</h1>
      <p className="text-xl mb-8">
        Connect with top companies and kickstart your career with exciting internship opportunities across Ghana.
      </p>
      <Link
        href="/internships"
        className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Browse Internships
      </Link>
    </main>
  </div>
  );
}
