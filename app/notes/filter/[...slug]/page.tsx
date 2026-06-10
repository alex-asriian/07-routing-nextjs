import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'

type Props = {
  params: Promise<{ slug: string[] }>
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params
  const slugTag = slug[0]

  const apiTag = slugTag === 'all' ? '' : slugTag

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', apiTag],
    queryFn: () => fetchNotes(1, 12, '', apiTag),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={slugTag} />
    </HydrationBoundary>
  )
}
