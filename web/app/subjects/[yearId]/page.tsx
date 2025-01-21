import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Header from '@/components/Header'

const subjects = [
  'اللغة العربية',
  'الرياضيات',
  'الفيزياء',
  'العلوم الطبيعية',
  'التاريخ والجغرافيا',
  'اللغة الفرنسية',
  'اللغة الإنجليزية',
]

export default function SubjectsPage({ params }: { params: { yearId: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          المواد الدراسية - السنة {params.yearId} ثانوي
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <Button
              key={subject}
              asChild
              className="text-xl py-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Link href={`/exercises/${params.yearId}/${encodeURIComponent(subject)}`}>{subject}</Link>
            </Button>
          ))}
        </div>
      </main>
    </div>
  )
}

