import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NotePreviewClient from '@/app/notes/filter/[...slug]/NotePreview.client' // вкажіть ваш шлях до NotePreviewClient

type Props = {
  params: Promise<{ id: string }>
}

export default async function InterceptedNoteModal({ params }: Props) {
  const { id } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient />
    </HydrationBoundary>
  )
}
