import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context'


// Custom hook - поиск заметки
export const UseSearchNote = () => {
  const { notes } = useContext(AppContext)

  const [searchValue, setSearchValue] = useState('')

  // Обработка изменения ввода для поиска заметки
  const handleSearchNote = (event) => {
    setSearchValue(event.target.value)
  }

  // Фильтрация заметки на основе значения поиска
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return {
    searchValue,
    handleSearchNote,
    filteredNotes,
  }
}
