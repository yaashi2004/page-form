import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Form Builder</h1>
      
      <div className="flex items-center gap-4 mb-8">
        <span>Authentication Status:</span>
        <UserButton />
      </div>
      
      <p className="text-lg">
        Welcome to Form Builder! If you see the UserButton above, Clerk is working.
      </p>
      
      <div className="mt-8 space-y-4">
        <a 
          href="/sign-in" 
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign In
        </a>
        <a 
          href="/sign-up" 
          className="block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Sign Up
        </a>
        <a 
          href="/dashboard" 
          className="block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Dashboard (Protected)
        </a>
      </div>
    </div>
  );
}
