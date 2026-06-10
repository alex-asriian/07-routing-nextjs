'use client'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal/Modal'
import NotePreview from '@/app/notes/[id]/NoteDetails.client'

export default function InterceptedNotePage() {
  const router = useRouter()

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview />
    </Modal>
  )
}
