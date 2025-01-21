"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"
import FloatingElements from "@/components/FloatingElements"
import Footer from "@/components/Footer"

const subjects = {
  literary: [
    { id: "arabic", name: "اللغة العربية", icon: "📝" },
    { id: "history", name: "التاريخ والجغرافيا", icon: "🌍" },
    { id: "philosophy", name: "الفلسفة", icon: "🤔" },
    { id: "french", name: "اللغة الفرنسية", icon: "🇫🇷" },
    { id: "english", name: "اللغة الإنجليزية", icon: "🇬🇧" },
  ],
  scientific: [
    { id: "math", name: "الرياضيات", icon: "🔢" },
    { id: "physics", name: "الفيزياء", icon: "⚛️" },
    { id: "biology", name: "العلوم الطبيعية", icon: "🧬" },
    { id: "french", name: "اللغة الفرنسية", icon: "🇫🇷" },
    { id: "english", name: "اللغة الإنجليزية", icon: "🇬🇧" },
  ],
}

export default function SubjectsPage({ params }: { params: { yearId: string; streamId: string } }) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const router = useRouter()

  const streamSubjects = subjects[params.streamId as keyof typeof subjects] || []

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject)
    setTimeout(() => {
      router.push(`/exercises/${params.yearId}/${params.streamId}/${subject}`)
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
          المواد الدراسية - السنة {params.yearId} ثانوي - {params.streamId === "literary" ? "أدبي" : "علمي"}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
        >
          {streamSubjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedSubject === subject.id ? "ring-4 ring-blue-500" : ""
                }`}
                onClick={() => handleSubjectSelect(subject.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">{subject.name}</h2>
                  <p className="text-gray-600">اختر هذه المادة للوصول إلى الفروض والتمارين الخاصة بها</p>
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

