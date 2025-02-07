import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Building2, Users, ArrowRight } from "lucide-react";
import JobList from "@/components/job-list";
import Newsletter from "@/components/newsletter";
import { JobFilters } from "@/components/job-filter";
import { motion } from 'framer-motion';

const statsData = [
  { icon: Briefcase, label: "Active Jobs", value: "2,400+" },
  { icon: Building2, label: "Companies", value: "1,200+" },
  { icon: Users, label: "Job Seekers", value: "3.4M+" },
];

const companies = [
  "GitHub",
  "Microsoft",
  "Stripe",
  "Amazon",
  "Shopify",
  "Google",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/10 dark:to-primary/5" />
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        
        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
            Find Your Dream Job
            <span className="block text-primary mt-2">in Ghana</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Discover thousands of job opportunities with all the information you need.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Input
                type="search"
                placeholder="Search jobs, companies, or keywords..."
                className="w-full h-16 pl-14 pr-4 rounded-2xl text-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 shadow-lg focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <Search className="absolute left-5 top-5 text-gray-400 group-hover:text-primary transition-colors duration-200" />
              <Button className="absolute right-3 top-3 rounded-xl" size="lg">
                Search Jobs
              </Button>
            </div>
            
            <div className="flex gap-4 mt-4 justify-center text-sm text-gray-500 dark:text-gray-400">
              <span>Popular:</span>
              {["Remote", "Tech", "Marketing", "Design"].map((tag) => (
                <button
                  key={tag}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 justify-center">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
            Trusted by leading companies
          </h2>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            {companies.map((company) => (
              <div
                key={company}
                className="group cursor-pointer"
              >
                <span className="text-xl font-semibold text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors duration-300">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Latest Jobs
          </h2>
          <Button variant="outline" className="gap-2">
            View all jobs <ArrowRight size={16} />
          </Button>
        </div>
        
        <JobFilters />
        <JobList />
        
        <div className="mt-16">
          <Newsletter />
        </div>
      </div>
    </main>
  );
}