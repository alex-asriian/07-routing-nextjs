'use client'

import { useState } from 'react'
import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import { fetchNotes } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import css from './NotesPage.module.css'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'
import { useDebouncedCallback } from 'use-debounce'
import Pagination from '@/components/Pagination/Pagination'

type Props = {
  tag: string
}

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Преобразуем 'all' в пустую строку для API бекенда
  const category = tag === 'all' ? '' : tag

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, category],
    queryFn: () => fetchNotes(page, 12, search, category),
    placeholderData: keepPreviousData,
  })

  const notes = data?.notes ?? []
  const total = data?.totalPages ?? 0

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, 300)

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        {total > 1 && (
          <Pagination
            pageCount={total}
            onPageChange={setPage}
            currentPage={page}
          />
        )}
        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {!isLoading && !isError && notes.length > 0 && (
          <NoteList items={notes} />
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}
