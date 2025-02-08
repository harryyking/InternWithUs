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
      <div>
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
    <div className="max-w-4xl mx-auto">
      {/* Banner */}
      <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={user.bannerImage}
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
      </div>

      {/* Profile Details */}
      <Card className="mt-20">
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