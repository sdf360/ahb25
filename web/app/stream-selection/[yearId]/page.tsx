"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"
import FloatingElements from "@/components/FloatingElements"
import Footer from "@/components/Footer"

const streams = [
  { id: "literary", name: "أدبي", icon: "📚" },
  { id: "scientific", name: "علمي", icon: "🧪" },
]

export default function StreamSelection({ params }: { params: { yearId: string } }) {
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const router = useRouter()

  const handleStreamSelect = (streamId: string) => {
    setSelectedStream(streamId)
    setTimeout(() => {
      router.push(`/subjects/${params.yearId}/${streamId}`)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 relative overflow-hidden">
      <FloatingElements />
      <Header />
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-bold text-blue-800 mb-8 text-center"
        >
          اختر الشعبة - السنة {params.yearId} ثانوي
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto"
        >
          {streams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedStream === stream.id ? "ring-4 ring-blue-500" : ""
                }`}
                onClick={() => handleStreamSelect(stream.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{stream.icon}</div>
                  <h2 className="text-3xl font-bold text-blue-700 mb-2">{stream.name}</h2>
                  <p className="text-gray-600">اختر هذه الشعبة للوصول إلى المواد الخاصة بها</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}

