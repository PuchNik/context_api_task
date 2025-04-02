import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context'

export const useRequestPut = () => {
  const { notes, setNotes } = useContext(AppContext)
  const [idTaskModified, setIdTaskModified] = useState(null)
  const [editTaskValue, setEditTaskValue] = useState('')

  const editTask = (id, title) => {
    setIdTaskModified(id)
    setEditTaskValue(title)
  }

  const handleEditChange = (event) => {
    setEditTaskValue(event.target.value)
  }

  const handleEditTask = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/notes/${idTaskModified}`, {
      method: 'PUT',
      headers: { 'Content-type': 'applications/json; charset=utf-8' },
      body: JSON.stringify({
        title: editTaskValue,
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .finally(() => {
        setIdTaskModified(null)
        setEditTaskValue('')
        setNotes(notes)
      })
  }

  return {
    editTask,
    idTaskModified,
    setIdTaskModified,
    handleEditChange,
    editTaskValue,
    handleEditTask,
  }
}
