import axios, { type AxiosResponse } from 'axios'
import type { Note, NoteTag } from '@/types/note'

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
})

export interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

export interface CreateNoteInput {
  title: string
  content: string
  tag: NoteTag
}

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> =
    await api.get<FetchNotesResponse>('/notes', {
      params: {
        page,
        perPage,
        search: search || undefined,
        tag: tag || undefined,
      },
    })
  return response.data
}

export async function createNote(noteData: CreateNoteInput): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post<
    Note,
    AxiosResponse<Note>,
    CreateNoteInput
  >('/notes', noteData)
  return response.data
}
export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete<Note>(`/notes/${id}`)

  return response.data
}
export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get<Note>(`/notes/${id}`)
  return response.data
}
