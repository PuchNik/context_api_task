import { useContext } from 'react'
import { AppContext } from '../../../context'

export const useRequestDelete = () => {
  const { notes, setNotes } = useContext(AppContext)
  const deleteTask = (id) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: 'DELETE',
    })
      .then((rowResponse) => rowResponse.json())
      .finally(() => {
        setNotes(notes)
      })
  }
  return {
    deleteTask,
  }
}
