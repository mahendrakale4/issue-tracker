"use client"
import { Button, Flex } from "@radix-ui/themes"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"

export const Hero = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Local grid enhancement for hero section */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent" />

      {/* Main hero content - centered vertically */}
      <div className="relative z-10 w-full px-6 text-center">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-block">
          <div className="rounded-full border border-purple-200 bg-purple-50/80 px-5 py-1.5 text-sm text-purple-700 backdrop-blur-sm">
            ✨ Track Issues Like Never Before 
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative">
          <h1 className="text-center text-4xl font-medium tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
            Simplify Your Project
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Management with Issuify
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 lg:text-xl">
          A modern, easy-to-use issue tracker designed to streamline your
          workflow and boost productivity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10">
          <Flex gap="4" justify="center" wrap="wrap">
            <Button
              size="3"
              className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-2.5 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-200">
              <Link href="/issues/list">Explore All Issues</Link>
            </Button>

            <Button
              size="3"
              className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-2.5 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-200 ">
              <Link href="/dashboard">Dashboard →</Link>
            </Button>

            <Button
              size="3"
              className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-2.5 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-200">
              <Link
                href="https://github.com/mahendrakale4/issue-tracker"
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer">
                <FaGithub className="text-lg" />
                <span>GitHub</span>
              </Link>
            </Button>
          </Flex>
        </motion.div>
      </div>
    </div>
  )
}
