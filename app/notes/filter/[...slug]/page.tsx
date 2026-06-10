'use client'
import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'
import { useParams } from 'next/navigation'
import { fetchNotes } from '@/lib/api'
import NoteList from '@/components/NoteList/NoteList'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import css from './NotesPage.module.css'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'

export default function FilteredNotes() {
  const params = useParams()
  const slug = params.slug as string[]
  const category = slug?.[0] === 'all' ? undefined : slug?.[0]

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, 300)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, category],
    queryFn: () => fetchNotes(page, 12, search, category),
    placeholderData: keepPreviousData,
  })

  const notes = data?.notes ?? []
  const total = data?.totalPages ?? 0

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
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
    </div>
  )
}
