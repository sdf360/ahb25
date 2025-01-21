"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import LoginModal from "./LoginModal"
import { useUser } from "@/contexts/UserContext"
import { motion } from "framer-motion"
import { HomeIcon, BookOpenIcon } from "lucide-react"

export default function Header() {
  const { userRole, username } = useUser()

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-90 backdrop-blur-md shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <BookOpenIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-800">ثانوية أحسن بورفع</h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
              <Link href="https://ahcenbourfaa.vercel.app">
                <HomeIcon className="mr-2" />
                الصفحة الرئيسية
              </Link>
            </Button>
          </motion.div>
          {userRole && (
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-blue-600"
            >
              {userRole === "teacher" ? "الأستاذ" : "الطالب"}: {username}
            </motion.span>
          )}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <LoginModal />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

