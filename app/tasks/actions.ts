'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export async function createTask(formData: FormData) {
  const session = await auth()
  
  if (!session) {
    throw new Error('Not authenticated')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string

  await db.task.create({
    data: {
      title,
      description,
      status,
      userId: session.user.id,
    },
  })

  revalidatePath('/tasks')
}

export async function updateTask(taskId: string, formData: FormData) {
  const session = await auth()
  
  if (!session) {
    throw new Error('Not authenticated')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string

  await db.task.update({
    where: {
      id: taskId,
      userId: session.user.id,
    },
    data: {
      title,
      description,
      status,
    },
  })

  revalidatePath('/tasks')
}

export async function deleteTask(taskId: string) {
  const session = await auth()
  
  if (!session) {
    throw new Error('Not authenticated')
  }

  await db.task.delete({
    where: {
      id: taskId,
      userId: session.user.id,
    },
  })

  revalidatePath('/tasks')
}