'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileIcon, DownloadIcon, LinkIcon, TrashIcon, CheckIcon } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useUser } from '@/contexts/UserContext'
import { motion, AnimatePresence } from 'framer-motion'

interface Exercise {
  id: number
  title: string
  fileUrl: string
  fileType: string
  isLink: boolean
  uploadDate: string
  approved: boolean
  subjectType: string
}

export default function ExercisesPage({ params }: { params: { yearId: string; subject: string } }) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { userRole } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    fetchExercises()
  }, [params.yearId, params.subject, userRole])

  const fetchExercises = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/exercises?yearId=${params.yearId}&subject=${params.subject}${userRole ? `&userRole=${userRole}` : ''}`)
      if (!response.ok) {
        throw new Error('Failed to fetch exercises')
      }
      const data = await response.json()
      setExercises(data)
    } catch (error) {
      console.error('Error fetching exercises:', error)
      toast({
        title: "خطأ",
        description: "فشل في جلب التمارين",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileAction = (exercise: Exercise) => {
    if (exercise.isLink) {
      window.open(exercise.fileUrl, '_blank', 'noopener,noreferrer')
    } else {
      const link = document.createElement('a')
      link.href = exercise.fileUrl
      link.download = `${exercise.title}.${exercise.fileType.toLowerCase()}`
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleDeleteExercise = async (id: number) => {
    if (userRole !== 'teacher') {
      toast({
        title: "غير مصرح",
        description: "لا يمكن للطلاب حذف التمارين",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/exercises?id=${id}&yearId=${params.yearId}&subject=${params.subject}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete exercise')
      }
      setExercises(exercises.filter(exercise => exercise.id !== id))
      toast({
        title: "تم حذف التمرين",
        description: "تم حذف التمرين بنجاح",
      })
    } catch (error) {
      console.error('Error deleting exercise:', error)
      toast({
        title: "خطأ",
        description: "فشل في حذف التمرين",
        variant: "destructive",
      })
    }
  }

  const handleApproveExercise = async (id: number) => {
    if (userRole !== 'teacher') {
      toast({
        title: "غير مصرح",
        description: "لا يمكن للطلاب الموافقة على التمارين",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/exercises', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, yearId: params.yearId, subject: params.subject, approved: true }),
      })
      if (!response.ok) {
        throw new Error('Failed to approve exercise')
      }
      setExercises(exercises.map(exercise =>
        exercise.id === id ? { ...exercise, approved: true } : exercise
      ))
      toast({
        title: "تمت الموافقة على التمرين",
        description: "تمت الموافقة على التمرين بنجاح",
      })
    } catch (error) {
      console.error('Error approving exercise:', error)
      toast({
        title: "خطأ",
        description: "فشل في الموافقة على التمرين",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            قسم التمارين والفروض
          </h1>
          <h2 className="text-2xl font-semibold text-blue-600">
            {decodeURIComponent(params.subject)} - السنة {params.yearId} ثانوي
          </h2>
        </motion.div>
        {isLoading ? (
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">جاري التحميل...</div>
          </div>
        ) : exercises.length > 0 ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {exercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="transition-all duration-300 ease-in-out transform hover:scale-105 border-blue-200 hover:border-blue-400 hover:shadow-lg">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-blue-700 flex items-center justify-between">
                        <span className="flex items-center">
                          {exercise.isLink ? <LinkIcon className="mr-2" /> : <FileIcon className="mr-2" />}
                          {exercise.title}
                        </span>
                        <div className="flex items-center">
                          {exercise.approved ? (
                            <span className="text-green-500 text-sm mr-2">تمت الموافقة</span>
                          ) : (
                            <span className="text-yellow-500 text-sm mr-2">قيد المراجعة</span>
                          )}
                          {userRole === 'teacher' && (
                            <div className="flex items-center">
                              {!exercise.approved && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleApproveExercise(exercise.id)}
                                  className="text-green-500 hover:text-green-700 mr-2 transition-colors duration-300"
                                >
                                  <CheckIcon className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteExercise(exercise.id)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">نوع الملف: {exercise.fileType}</span>
                        <span className="text-sm text-gray-600">تاريخ الرفع: {exercise.uploadDate}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        نوع المادة: {exercise.subjectType}
                      </div>
                      <Button
                        onClick={() => handleFileAction(exercise)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                      >
                        {exercise.isLink ? <LinkIcon className="mr-2" /> : <DownloadIcon className="mr-2" />}
                        {exercise.isLink ? 'فتح الرابط' : 'تنزيل الملف'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-xl text-blue-600 mb-4">لا توجد تمارين متاحة حالياً لهذه المادة والسنة الدراسية</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}

