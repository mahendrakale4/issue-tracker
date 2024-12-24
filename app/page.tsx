import { Metadata } from "next"
import { Features } from "./Features"
import { Hero } from "./Hero"

const HomePage = () => {
  return (
    <>
      <div className="flex min-h-[87vh] w-full flex-col items-center justify-center gap-8">
        <Hero />
        <Features />
        <div className="container mx-auto border-t pt-6 text-center dark:border-zinc-600">
          <p>© {new Date().getFullYear()} Issuefy. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}
export const metadata: Metadata = {
  title: "Issue Tracker ",
  description: "Simplify Your Project Management with Issuefy",
}
export default HomePage
