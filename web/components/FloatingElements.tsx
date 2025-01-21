"use client"

import { motion } from "framer-motion"
import { Book, Pencil, Calculator, Globe, Atom } from "lucide-react"

const floatingElements = [
  { Icon: Book, color: "#3B82F6", size: 40 },
  { Icon: Pencil, color: "#10B981", size: 36 },
  { Icon: Calculator, color: "#F59E0B", size: 38 },
  { Icon: Globe, color: "#8B5CF6", size: 42 },
  { Icon: Atom, color: "#EC4899", size: 44 },
]

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <element.Icon size={element.size} color={element.color} opacity={0.2} />
        </motion.div>
      ))}
    </div>
  )
}

