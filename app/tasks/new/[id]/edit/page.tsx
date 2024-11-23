import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { TaskForm } from '@/components/TaskForm'

export default async function EditTaskPage({
  params,
}: {
  params: { id: string }
}) {
  const task = await db.task.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!task) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Task</h1>
      <TaskForm initialData={task} />
    </div>
  )
}