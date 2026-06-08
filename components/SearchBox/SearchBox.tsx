import css from './SearchBox.module.css'
import { useState, type ChangeEvent } from 'react'

interface SearchBoxProps {
  onChange: (value: string) => void
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value
    setInputValue(val)
    onChange(val)
  }
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  )
}
