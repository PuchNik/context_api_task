import {useContext} from 'react'
import {AppContext} from '../../../context'

export const useRequestDelete = () => {
    const {setNotes} = useContext(AppContext)
    const deleteTask = (id) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
        })
            .then((rowResponse) => rowResponse.json())
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
            })
    }
    return {
        deleteTask,
    }
}
