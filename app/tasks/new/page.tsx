import { TaskForm } from '@/components/TaskForm'

export default function NewTaskPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Create New Task</h1>
      <TaskForm />
    </div>
  )
}
