import { Metadata } from "next"
import { Features } from "./Features"
import { Hero } from "./Hero"

const HomePage = () => {
  return (
    <div className="relative min-h-auto w-full bg-white overflow-hidden">
      {/* Enhanced blur effects */}
      <div className="absolute right-[-20%] top-0 h-[1000px] w-[1000px] rounded-full blur-[120px] opacity-40" />
      <div className="absolute left-[-20%] bottom-0 h-[800px] w-[800px] rounded-full  blur-[120px] opacity-40" />

      {/* Base grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0000000a 1px, transparent 1px),
            linear-gradient(to bottom, #0000000a 1px, transparent 1px)
          `,
          backgroundSize: "14px 14px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <div className="h-screen">
          <Hero />
        </div>

        {/* Features Section */}
        <div className="relative w-full bg-white/80 backdrop-blur-sm">
          <Features />
        </div>

        {/* Footer */}
        <div className="relative w-full border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto px-6 py-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Issuify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Simplify Your Project Management with Issuefy",
}

export default HomePage
