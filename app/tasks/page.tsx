import { Suspense } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DeleteTaskButton } from './DeleteTaskButton'

export default async function TasksPage() {
  const session = await auth()
  
  if (!session) {
    return redirect('/api/auth/signin')
  }

  const tasks = await db.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <Button asChild>
          <Link href="/tasks/new">Create New Task</Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>Status: {task.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{task.description}</p>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
                </Button>
                <DeleteTaskButton id={task.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}