import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe,Linkedin, Mail, Building, Calendar, ExternalLink } from 'lucide-react';

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        
        <div className="px-6 pb-6">
          <div className="relative">
            {/* Profile Image */}
            <div className="absolute -top-24 flex items-end">
              <div className="relative">
                <img 
                  src="/api/placeholder/200/200"
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-3 right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <div className="ml-4 mb-4">
                <Button variant="outline" className="shadow-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    John Doe 
                    <span className="text-2xl">👨‍💻</span>
                  </h1>
                  <p className="text-gray-600 text-lg mt-1">✨ Senior Full Stack Developer</p>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Download Resume
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>🌎 San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>🕒 UTC-8</span>
                </div>
                <Badge className="bg-green-500">🟢 Available for Work</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader className="text-xl font-semibold">
              📝 About Me
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                🚀 Full-stack developer with 8+ years of experience building scalable web applications.
                💡 Passionate about clean code, user experience, and building products that make a difference.
                🌟 Always learning and exploring new technologies.
              </p>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader className="text-xl font-semibold">
              💼 Experience
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">👨‍💻 Senior Developer</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Building className="w-4 h-4" />
                      <span>Tech Corp</span>
                    </div>
                  </div>
                  <div className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>2020 - Present</span>
                  </div>
                </div>
                <p className="mt-3 text-gray-600">
                  🎯 Led development of core platform features
                  👥 Mentored junior developers
                  📈 Improved system performance by 40%
                </p>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">🛠️ Full Stack Developer</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Building className="w-4 h-4" />
                      <span>StartUp Inc</span>
                    </div>
                  </div>
                  <div className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>2018 - 2020</span>
                  </div>
                </div>
                <p className="mt-3 text-gray-600">
                  💻 Built customer-facing applications
                  🔄 Implemented CI/CD pipelines
                  🤝 Collaborated with cross-functional teams
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader className="text-xl font-semibold">
              🚀 Projects
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">🛍️ E-commerce Platform</h3>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <p className="mt-2 text-gray-600">
                  Built a full-featured e-commerce platform using Next.js and Stripe.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary">⚛️ Next.js</Badge>
                  <Badge variant="secondary">💳 Stripe</Badge>
                  <Badge variant="secondary">📝 TypeScript</Badge>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">📋 Task Management App</h3>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <p className="mt-2 text-gray-600">
                  Developed a real-time task management application with React and Firebase.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary">⚛️ React</Badge>
                  <Badge variant="secondary">🔥 Firebase</Badge>
                  <Badge variant="secondary">🎨 Tailwind</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact Info Card */}
          <Card>
            <CardHeader className="text-xl font-semibold">
              📫 Contact
            </CardHeader>
            <CardContent className="space-y-4">
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                <Mail className="w-4 h-4" />
                <span>✉️ john@example.com</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                <span>🐱 github.com/johndoe</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                <Linkedin className="w-4 h-4" />
                <span>💼 linkedin.com/in/johndoe</span>
              </a>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card>
            <CardHeader className="text-xl font-semibold">
              🛠️ Skills
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>⚛️ React</Badge>
                <Badge>📝 TypeScript</Badge>
                <Badge>🟩 Node.js</Badge>
                <Badge>🐘 PostgreSQL</Badge>
                <Badge>☁️ AWS</Badge>
                <Badge>🐳 Docker</Badge>
                <Badge>⚡ GraphQL</Badge>
                <Badge>🔄 Next.js</Badge>
                <Badge>🎨 Tailwind</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Availability Card */}
          <Card>
            <CardHeader className="text-xl font-semibold">
              🎯 Availability
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge className="bg-green-500">✅ Available for Work</Badge>
                <p className="text-gray-600">
                  🌍 Open to remote opportunities
                  ⏰ Can start in 2 weeks
                  💼 Prefer full-time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;