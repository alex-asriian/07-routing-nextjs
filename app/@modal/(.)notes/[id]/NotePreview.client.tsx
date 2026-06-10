'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import css from './NotePreview.module.css'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'

export default function NotePreviewClient() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const router = useRouter()

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id!),
    enabled: !!id,
    refetchOnMount: false,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (error || !note) return <p>Something went wrong.</p>

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  )
}
