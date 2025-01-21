"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const years = [
  { id: 1, name: "السنة الأولى ثانوي" },
  { id: 2, name: "السنة الثانية ثانوي" },
  { id: 3, name: "السنة الثالثة ثانوي" },
]

export default function YearSelection() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const router = useRouter()

  const handleYearSelect = (yearId: number) => {
    setSelectedYear(yearId)
    setTimeout(() => {
      router.push(`/stream-selection/${yearId}`)
    }, 500)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-blue-800 mb-12 text-center"
      >
        مرحباً بكم في موقع ثانوية أحسن بورفع
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl text-blue-600 mb-12 max-w-2xl mx-auto text-center"
      >
        اكتشف الفروض والتمارين لجميع المستويات الدراسية وارتقِ بمستواك الأكاديمي
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
      >
        {years.map((year, index) => (
          <motion.div
            key={year.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedYear === year.id ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => handleYearSelect(year.id)}
            >
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-2">{year.name}</h2>
                <p className="text-gray-600">اختر هذه السنة للوصول إلى الفروض والتمارين الخاصة بها</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

