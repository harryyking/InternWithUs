"use client"
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Linkedin, Mail, Building, Calendar, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import UserProfileForm from '@/components/user-form';

const Page = () => {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  if (isEditMode) {
    return (
      <div className='bg-gray-100'>
          <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
            <img
              src='https://images.pexels.com/photos/1181274/pexels-photo-1181274.jpeg'
              alt="Banner"
              className="w-full h-full object-cover"
            />

          <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[60px] fill-white dark:fill-gray-900 transform translate-y-1"
            preserveAspectRatio="none"
          >
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      
          </div>

        <UserProfileForm />
      </div>
    );
  }

  // Mock user data
  const user = {
    name: "John Doe",
    title: "Software Engineer",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john.doe@example.com",
    company: "Remote OK",
    skills: ["React", "Node.js", "TypeScript", "Next.js"],
    bannerImage: "https://via.placeholder.com/1200x400", // Placeholder banner image
    profileImage: "https://via.placeholder.com/150", // Placeholder profile image
  };

  return (
    <div className='bg-gray-100'>
      {/* Banner */}
      <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1181274/pexels-photo-1181274.jpeg"
          alt="Banner"
          className="w-full h-full object-cover"
        />

       
      

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[60px] fill-white dark:fill-gray-900 transform translate-y-1"
            preserveAspectRatio="none"
          >
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </div>

      {/* Profile Details */}
      <Card className="mt-8 max-w-4xl mx-auto">
        <CardContent className="p-6">
          {/* Name and Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.title}</p>
          </div>

          {/* Location and Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{user.location}</span>
            </div>
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <Globe className="w-4 h-4 mr-2" />
              <span>Website</span>
            </a>
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${user.email}`}
              className="flex items-center text-blue-600 hover:underline"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span>Email</span>
            </a>
          </div>

          {/* Company */}
          <div className="flex items-center justify-center mt-4 text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>{user.company}</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Edit Button */}
          <div className="flex justify-center mt-6">
            <Button variant="outline">
              <a href="?edit=true">Edit Profile</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;