"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MapPin, DollarSign, Award, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function JobFilters() {
  const categories = [
    { icon: "💻", label: "Engineer" },
    { icon: "👔", label: "Executive" },
    { icon: "🎯", label: "Senior" },
    { icon: "🖥️", label: "Developer" },
    { icon: "💰", label: "Finance" },
    { icon: "🔧", label: "Sys Admin" },
  ]

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Search
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Full-time</DropdownMenuItem>
            <DropdownMenuItem>Part-time</DropdownMenuItem>
            <DropdownMenuItem>Contract</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" />
              Location
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Worldwide</DropdownMenuItem>
            <DropdownMenuItem>Americas</DropdownMenuItem>
            <DropdownMenuItem>Europe</DropdownMenuItem>
            <DropdownMenuItem>Asia</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Salary
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>$0 - $50k</DropdownMenuItem>
            <DropdownMenuItem>$50k - $100k</DropdownMenuItem>
            <DropdownMenuItem>$100k - $150k</DropdownMenuItem>
            <DropdownMenuItem>$150k+</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Award className="h-4 w-4" />
              Benefits
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Health Insurance</DropdownMenuItem>
            <DropdownMenuItem>401k</DropdownMenuItem>
            <DropdownMenuItem>Paid Time Off</DropdownMenuItem>
            <DropdownMenuItem>Remote Work</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(({ icon, label }) => (
          <Badge key={label} variant="secondary" className="gap-1 text-sm">
            {icon} {label}
          </Badge>
        ))}
      </div>
    </div>
  )
}

