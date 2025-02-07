import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Building2, Users, ArrowRight } from "lucide-react";
import JobList from "@/components/job-list";
import Newsletter from "@/components/newsletter";
import { JobFilters } from "@/components/job-filter";
import { motion } from 'framer-motion';
import { Header } from '@/components/header';

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
     <div className="relative">
     <Header/>
     
        <div 
          className="relative h-[600px] flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url(https://images.pexels.com/photos/1181274/pexels-photo-1181274.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          
            
            <div className="absolute inset-0" />
          <div className="relative z-10 text-center space-y-8 px-4 max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-medium text-white">
              Find a job <span className="text-primary font-semibold mt-2">in Ghana</span>
            </h1>
            
            <p className="text-lg md:text-xl">
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
              
              <div className="flex gap-4 mt-4 justify-center text-sm text-gray-300">
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

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[60px] fill-white dark:fill-gray-800 transform translate-y-1"
            preserveAspectRatio="none"
          >
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <JobFilters />
        <JobList />
        
      </div>
    </main>
  );
}