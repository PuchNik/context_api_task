import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context'


// Custom hook - обновление(редактирование) заметки
export const useRequestPut = () => {
  const { setNotes } = useContext(AppContext)
  const [idNoteModified, setIdNoteModified] = useState(null)
  const [editNoteValue, setEditNoteValue] = useState('')

  // Инициализация редактирования заметки
  const editNote = (id, title) => {
    setIdNoteModified(id)
    setEditNoteValue(title)
  }

  // Обработка изменения ввода редактируемой заметки
  const handleEditChange = (event) => {
    setEditNoteValue(event.target.value)
  }

  // Обработка события редактирования заметки
  const handleEditNote = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/notes/${idNoteModified}`, {
      method: 'PUT',
      headers: { 'Content-type': 'applications/json; charset=utf-8' },
      body: JSON.stringify({
        title: editNoteValue,
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .then((updatedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === idNoteModified ? updatedNote : note
          )
        )
      })

      .finally(() => {
        setIdNoteModified(null)
        setEditNoteValue('')
      })
  }

  return {
    editNote,
    idNoteModified,
    setIdNoteModified,
    handleEditChange,
    editNoteValue,
    handleEditNote,
  }
}
