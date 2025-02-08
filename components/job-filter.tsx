"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MapPin, DollarSign, Award, ChevronDown, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function JobFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const categories = [
    { icon: "💻", label: "Engineer" },
    { icon: "👔", label: "Executive" },
    { icon: "🎯", label: "Senior" },
    { icon: "🖥️", label: "Developer" },
    { icon: "💰", label: "Finance" },
    { icon: "🔧", label: "Sys Admin" },
    { icon: "🎨", label: "Designer" },
    { icon: "📊", label: "Data Analyst" },
    { icon: "🔬", label: "Researcher" },
  ]

  const filterOptions = [
    {
      icon: <Search className="h-4 w-4" />,
      label: "Job Type",
      options: ["Full-time", "Part-time", "Contract", "Internship"],
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Location",
      options: ["Worldwide", "Americas", "Europe", "Asia", "Africa", "Australia"],
    },
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: "Salary",
      options: ["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"],
    },
    {
      icon: <Award className="h-4 w-4" />,
      label: "Benefits",
      options: [
        "Health Insurance",
        "401k",
        "Paid Time Off",
        "Remote Work",
        "Stock Options",
        "Professional Development",
      ],
    },
  ]

  const handleFilterSelect = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  return (
    <div className="mb-8 space-y-4 sticky top-0">
      <ScrollArea className="w-full whitespace-nowrap p-2">
        <div className="flex w-max space-x-4">
          {filterOptions.map((filter) => (
            <DropdownMenu key={filter.label}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {filter.icon}
                  {filter.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {filter.options.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => handleFilterSelect(option)}
                    className="flex items-center justify-between"
                  >
                    {option}
                    {activeFilters.includes(option) && <span className="text-green-500">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

     

        <div className="flex w-max space-x-2">
          {categories.map(({ icon, label }) => (
            <Badge
              key={label}
              variant="outline"
              className="gap-1 text-sm cursor-pointer transition-colors hover:bg-secondary"
              onClick={() => handleFilterSelect(label)}
            >
              {icon} {label}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <Badge key={filter} variant="secondary" className="gap-1 text-sm">
            {filter}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleFilterSelect(filter)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

