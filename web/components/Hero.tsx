import { motion } from "framer-motion"
import { GraduationCap, BookOpen, PenTool } from "lucide-react"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">مرحباً بكم في ثانوية أحسن بورفع</h1>
          <p className="text-xl mb-12">اكتشف عالماً من المعرفة والتعلم مع أفضل الموارد التعليمية</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { icon: GraduationCap, title: "تعليم عالي الجودة", description: "نقدم أفضل الموارد التعليمية لضمان نجاحك" },
            { icon: BookOpen, title: "مكتبة شاملة", description: "اكتشف مجموعة واسعة من الكتب والمراجع" },
            { icon: PenTool, title: "تمارين تفاعلية", description: "حسن مهاراتك من خلال تمارين عملية" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white bg-opacity-10 p-6 rounded-lg text-center"
            >
              <item.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

