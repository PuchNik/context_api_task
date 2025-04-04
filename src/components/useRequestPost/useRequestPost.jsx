import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context'


// Custom hook - добавление заметок
export const useRequestPost = () => {
  const { setNotes } = useContext(AppContext)
  const [noteValue, setNoteValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Обработка изменения ввода заметки
  const handleInputChange = (event) => {
    setNoteValue(event.target.value)
    setErrorMessage('')
  }

  //  Добавление заметки (общая)
  const templateForAddingNote = () => {
    if (!noteValue) {
      setErrorMessage('Невозможно добавить пустую задачу')
      setTimeout(() => {
        setErrorMessage('')
      }, 2500)
      return
    }

    // Отправка запроса на добавление заметки
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: noteValue.charAt(0).toUpperCase() + noteValue.slice(1),
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .then((newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote])
      })

      .finally(() => {
        setNoteValue('')
      })
  }

  // Обработка события - добавление заметки
  const handleAddNote = (event) => {
    event.preventDefault()
    templateForAddingNote()
  }

  // Добавление новой заметки
  const addNewNote = () => {
    templateForAddingNote()
  }

  return {
    addNewNote,
    noteValue,
    handleInputChange,
    handleAddNote,
    errorMessage,
  }
}
