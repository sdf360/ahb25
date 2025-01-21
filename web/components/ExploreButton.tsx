"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ExploreButton() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        asChild
        className="
          text-lg px-8 py-4 rounded-full
          bg-blue-600 text-white
          transition-all duration-300 ease-in-out
          hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          group
        "
      >
        <Link
          href="#year-selection"
          className="
          relative
          before:content-[''] before:absolute before:inset-0
          before:rounded-full before:bg-blue-400 before:opacity-0
          group-hover:before:opacity-100 before:transition-opacity before:duration-300
          flex items-center justify-center
        "
        >
          <motion.span
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            استكشف الفروض والتمارين
          </motion.span>
        </Link>
      </Button>
    </motion.div>
  )
}

