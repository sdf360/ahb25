import { NextResponse } from "next/server"
import { getExercises, addExercise, deleteExercise, approveExercise, type Exercise } from "@/lib/exercises"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userRole = searchParams.get("userRole") as "teacher" | "student" | undefined
  const yearId = searchParams.get("yearId") || ""
  const streamId = searchParams.get("streamId") || ""
  const subject = searchParams.get("subject") || ""

  const exercises = getExercises(yearId, streamId, subject, userRole)

  // إذا كان المستخدم طالبًا، قم بإرجاع التمارين المعتمدة فقط
  const filteredExercises = userRole === "student" ? exercises.filter((ex) => ex.approved) : exercises

  return NextResponse.json(filteredExercises)
}

export async function POST(request: Request) {
  const exercise = (await request.json()) as Omit<Exercise, "id">
  const newExercise = addExercise(exercise)
  return NextResponse.json(newExercise)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const success = deleteExercise(Number(id))
    return NextResponse.json({ success })
  }

  return NextResponse.json({ success: false }, { status: 400 })
}

export async function PUT(request: Request) {
  const { id, yearId, streamId, subject } = await request.json()

  if (id) {
    const success = approveExercise(Number(id), { yearId, streamId, subject, approved: true })
    return NextResponse.json({ success })
  }

  return NextResponse.json({ success: false }, { status: 400 })
}

