"use client"

import { motion } from "framer-motion"
import { CodeIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="fixed bottom-4 left-4 flex items-center space-x-2 text-blue-600">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <CodeIcon className="h-5 w-5" />
      </motion.div>
      <span className="text-sm">مصنوع من طرف siradj eddine meziani</span>
    </footer>
  )
}

