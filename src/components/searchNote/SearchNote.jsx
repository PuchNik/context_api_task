import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context'

export const SearchNote = () => {
  const { notes } = useContext(AppContext)

  const [searchValue, setSearchValue] = useState('')

  const handleSearchNote = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return {
    searchValue,
    handleSearchNote,
    filteredNotes,
  }
}
