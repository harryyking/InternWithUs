import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import JobList from "@/components/job-list"
import Newsletter from "@/components/newsletter"
import { JobFilters } from "@/components/job-filter"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div
        className="relative h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${encodeURI("https://sjc.microlink.io/hayyC8uNqCcy9aVwrz91i6pqpOffddsdw-1NRuqSl1huPW4vKEtdkbY53ofW_6aOv8KqmZjA0lM838Ct8sNIOQ.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center space-y-6 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            find a <span className="text-primary">remote job</span>
            <br />
            work from <span className="text-primary">anywhere</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for remote jobs..."
                className="w-full h-14 pl-12 pr-4 rounded-lg text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg"
              />
              <Search className="absolute left-4 top-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            👋 Hiring remotely? Reach <span className="font-bold">3,400,000+ remote workers</span> on the 🏆 #1 Remote
            Job Board
          </p>
          <div className="flex gap-3 mt-3 sm:mt-0">
            <Button variant="default">Post a remote job</Button>
            <Button variant="outline">Hide this</Button>
          </div>
        </div>
      </div>

      {/* Company Logos */}
      <div className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-75">
            {["GitHub", "Microsoft", "Stripe", "Amazon", "Shopify"].map((company) => (
              <div key={company} className="h-8">
                <span className="text-xl font-semibold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <JobFilters />
        <JobList />
        <Newsletter />
      </div>
    </main>
  )
}

