'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'
import { deleteNote } from '@/lib/api'
import Link from 'next/link'

interface NoteListProps {
  items: Note[]
}

export default function NoteList({ items }: NoteListProps) {
  const queryClient = useQueryClient()

  const { mutate: deleteNoteMutation } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  return (
    <ul className={css.list}>
      {items.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          {id}
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link href={`/notes/${id}`}>View details</Link>
            <button
              className={css.button}
              onClick={() => deleteNoteMutation(id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
