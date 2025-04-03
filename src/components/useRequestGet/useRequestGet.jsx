import {useEffect, useState} from 'react'
import {useContext} from 'react'
import {AppContext} from '../../../context'

export const useRequestGet = () => {
    const {setNotes} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:3000/notes')
            .then((loadedData) => loadedData.json())
            .then((taskData) => setNotes(taskData))

            .finally(() => {
                setIsLoading(false)
            })
    }, [setNotes])

    return {
        isLoading
    }
}
