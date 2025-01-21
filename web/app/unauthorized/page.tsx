import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">غير مصرح بالوصول</h1>
        <p className="text-xl text-gray-600 mb-8">عذرًا، ليس لديك صلاحية للوصول إلى هذا المحتوى.</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/">العودة إلى الصفحة الرئيسية</Link>
        </Button>
      </div>
    </div>
  )
}

