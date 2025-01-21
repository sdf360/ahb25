import fs from "fs"
import path from "path"

export interface Exercise {
  id: number
  title: string
  fileUrl: string
  fileType: string
  isLink: boolean
  uploadDate: string
  yearId: string
  streamId: string
  subject: string
  approved: boolean
}

let exercises: Exercise[] = []

const EXERCISES_FILE = path.join(process.cwd(), "data", "exercises.json")

export function loadExercises() {
  if (fs.existsSync(EXERCISES_FILE)) {
    const data = fs.readFileSync(EXERCISES_FILE, "utf-8")
    exercises = JSON.parse(data)
  }
}

export function saveExercises() {
  const dir = path.dirname(EXERCISES_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(EXERCISES_FILE, JSON.stringify(exercises, null, 2))
}

export function getExercises(
  yearId: string,
  streamId: string,
  subject: string,
  userRole?: "teacher" | "student",
): Exercise[] {
  loadExercises()
  return exercises.filter(
    (ex) =>
      ex.yearId === yearId &&
      ex.streamId === streamId &&
      ex.subject === subject &&
      (userRole === "teacher" || ex.approved),
  )
}

export function addExercise(exercise: Omit<Exercise, "id">): Exercise {
  loadExercises()
  const newExercise = { ...exercise, id: Date.now() }
  exercises.push(newExercise)
  saveExercises()
  return newExercise
}

export function deleteExercise(id: number): boolean {
  loadExercises()
  const index = exercises.findIndex((ex) => ex.id === id)
  if (index !== -1) {
    exercises.splice(index, 1)
    saveExercises()
    return true
  }
  return false
}

export function approveExercise(
  id: number,
  data: { yearId: string; streamId: string; subject: string; approved: boolean },
): boolean {
  loadExercises()
  const exercise = exercises.find((ex) => ex.id === id)
  if (exercise) {
    Object.assign(exercise, data)
    saveExercises()
    return true
  }
  return false
}

