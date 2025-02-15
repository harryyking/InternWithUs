"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, LockKeyhole, ArrowRight, Loader2, Store } from 'lucide-react';
import { getUserId } from '@/actions/userAction';



const Register = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleIsLoading, setGoogleIsLoading] = useState(false);
  const router = useRouter();



  const handleSignInMagicLink = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
     
      return;
    }

    setIsLoading(true);
    const signInResult = await signIn("email", {
      email,
      callbackUrl: '/',
      redirect: false,
    });
    setIsLoading(false);

    if (signInResult?.ok) {
      setEmail("");
     

      router.push('/'); // Redirect to /store after showing the success toast
    } else {

    }
  }

  const handleSignInGoogle = async() => {
    setGoogleIsLoading(true);
    const signInResult = await signIn("google", {callbackUrl: '/'});
    if (!signInResult) {
      setGoogleIsLoading(false);
      return;
    }

    if(signInResult.ok) {
      router.push('/');


    }
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Sign in</CardTitle>
            <CardDescription>Choose your preferred sign-in method</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSignInMagicLink} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
              <Button 
                className="w-full font-medium" 
                type="submit" 
                disabled={isLoading} 
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Magic Link...
                  </>
                ) : (
                  <>
                    Continue with Email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              className="w-full font-medium"
              variant="outline"
              onClick={handleSignInGoogle}
              disabled={googleIsLoading}
              size="lg"
            >
              {googleIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
          </CardContent>
          
          <CardFooter className="flex flex-col text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our{' '}
              <a href="/terms-of-service" className="text-blue-600 hover:text-blue-800 underline">
                terms of service
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;