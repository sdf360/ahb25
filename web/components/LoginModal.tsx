"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/UserContext"
import { motion, AnimatePresence } from "framer-motion"

const years = [
  { id: 1, name: "السنة الأولى ثانوي" },
  { id: 2, name: "السنة الثانية ثانوي" },
  { id: 3, name: "السنة الثالثة ثانوي" },
]

const streams = [
  { id: "literary", name: "أدبي" },
  { id: "scientific", name: "علمي" },
]

const subjects = {
  literary: ["اللغة العربية", "التاريخ والجغرافيا", "الفلسفة", "اللغة الفرنسية", "اللغة الإنجليزية"],
  scientific: ["الرياضيات", "الفيزياء", "العلوم الطبيعية", "اللغة الفرنسية", "اللغة الإنجليزية"],
}

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedStream, setSelectedStream] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState("")
  const [customFileName, setCustomFileName] = useState("")
  const { userRole, setUserRole, username, setUsername } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    setSelectedSubject("")
  }, [selectedStream])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "خياط" && password === "2424") {
      setUserRole("teacher")
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بك في نظام رفع الملفات",
      })
    } else {
      setUserRole("student")
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بك في نظام عرض الملفات",
      })
    }
    setIsOpen(false)
  }

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userRole !== "teacher") {
      toast({
        title: "غير مصرح",
        description: "لا يمكن للطلاب رفع الملفات",
        variant: "destructive",
      })
      return
    }

    if (!selectedYear || !selectedStream || !selectedSubject || (!file && !fileUrl)) {
      toast({
        title: "خطأ في رفع الملف",
        description: "الرجاء اختيار السنة والشعبة والمادة وتحديد الملف أو إدخال الرابط",
        variant: "destructive",
      })
      return
    }

    if (!file && !isValidUrl(fileUrl)) {
      toast({
        title: "خطأ في الرابط",
        description: "الرجاء إدخال رابط صحيح",
        variant: "destructive",
      })
      return
    }

    try {
      let uploadedFileUrl = fileUrl
      let fileType = "LINK"
      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to upload file")
        }
        const data = await response.json()
        uploadedFileUrl = data.fileUrl
        fileType = file.name.split(".").pop()?.toUpperCase() || "UNKNOWN"
      }

      const exerciseData = {
        title: customFileName || `${selectedSubject} - ${selectedYear}`,
        fileUrl: uploadedFileUrl,
        fileType: fileType,
        isLink: !file,
        yearId: selectedYear,
        streamId: selectedStream,
        subject: selectedSubject,
        uploadDate: new Date().toISOString().split("T")[0],
        approved: false,
      }

      const response = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save exercise")
      }

      toast({
        title: "تم رفع الملف بنجاح",
        description: file ? `تم رفع الملف: ${customFileName || file.name}` : `تم حفظ الرابط: ${fileUrl}`,
      })

      setFile(null)
      setFileUrl("")
      setSelectedYear("")
      setSelectedStream("")
      setSelectedSubject("")
      setCustomFileName("")
      setIsOpen(false)
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "فشل في رفع الملف",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    setUserRole(null)
    setUsername("")
    setPassword("")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
          {userRole ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {userRole === "teacher" ? "الأستاذ" : "الطالب"}: {username}
            </motion.span>
          ) : (
            "تسجيل الدخول"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{userRole ? "مرحبًا بك" : "تسجيل الدخول"}</DialogTitle>
          <DialogDescription>
            {userRole
              ? userRole === "teacher"
                ? "يمكنك الآن رفع الملفات وإدارتها"
                : "يمكنك الآن عرض الملفات المتاحة"
              : "قم بتسجيل الدخول للوصول إلى نظام إدارة الملفات"}
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {userRole ? (
            <motion.div
              key="logout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
              >
                تسجيل الخروج
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="login"
              onSubmit={handleLogin}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    اسم المستخدم
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    كلمة المرور
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
                  تسجيل الدخول
                </Button>
              </DialogFooter>
            </motion.form>
          )}
        </AnimatePresence>
        {userRole === "teacher" && (
          <motion.form
            onSubmit={handleFileUpload}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  السنة الدراسية
                </Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر السنة الدراسية" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.id} value={year.id.toString()}>
                        {year.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stream" className="text-right">
                  الشعبة
                </Label>
                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الشعبة" />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map((stream) => (
                      <SelectItem key={stream.id} value={stream.id}>
                        {stream.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  المادة
                </Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر المادة" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedStream &&
                      subjects[selectedStream as keyof typeof subjects].map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  الملف
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileUrl" className="text-right">
                  أو رابط الملف
                </Label>
                <Input
                  id="fileUrl"
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://example.com/file.pdf"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customFileName" className="text-right">
                  اسم الملف المخصص
                </Label>
                <Input
                  id="customFileName"
                  type="text"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  placeholder="اسم الملف المخصص (اختياري)"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
                رفع الملف أو الرابط
              </Button>
            </DialogFooter>
          </motion.form>
        )}
      </DialogContent>
    </Dialog>
  )
}

