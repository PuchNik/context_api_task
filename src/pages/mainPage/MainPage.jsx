import styles from './MainPage.module.css'
import { useContext } from 'react'
import { AppContext } from '../../../context.js'
import {
  UseSortNotes,
  UseSearchNote,
  useRequestDelete,
  useRequestGet,
  useRequestPost,
  useRequestPut,
  Btn,
} from '../../components/index.js'


export default function MainPage() {
  const { notes } = useContext(AppContext)

  // Custom hook - GET
  const { isLoading } = useRequestGet()

  // Custom hook - POST
  const {
    addNewNote,
    noteValue,
    handleInputChange,
    handleAddNote,
    errorMessage,
  } = useRequestPost()

  // Custom hook - PUT
  const {
    editNote,
    idNoteModified,
    setIdNoteModified,
    handleEditChange,
    editNoteValue,
    handleEditNote,
  } = useRequestPut()

  // Custom hook - DELETE
  const { deleteNote } = useRequestDelete()

  // Custom hook - Search
  const { searchValue, handleSearchNote, filteredNotes } = UseSearchNote()

  // Custom hook - Sort
  const { sortedNotes } = UseSortNotes()

  return (
    <div className={styles['app-container']}>
      {isLoading ? (
        <p className={styles['loading-text']}>
          Пожалуйста, подождите, идет загрузка данных...
        </p>
      ) : (
        <div className={styles['content-container']}>
          <div className={styles['filter-container']}>
            <input
              className={styles['search-input']}
              type="text"
              placeholder="Поиск задачи..."
              value={searchValue}
              onChange={handleSearchNote}
            />
            <h1 className={styles['title']}>Список пользователей</h1>
            <Btn className={styles['sort-button']} onClick={sortedNotes}>
              Фильтр А-Я
            </Btn>
          </div>
          <div className={styles['task-input-container']}>
            <form className={styles['task-form']} onSubmit={handleAddNote}>
              <input
                className={styles['task-input']}
                type="text"
                placeholder="Записать задачу..."
                value={noteValue}
                onChange={handleInputChange}
              />
            </form>
            <Btn
              className={styles['add-button']}
              onClick={addNewNote}
              type={'submit'}
            >
              Добавить
            </Btn>
          </div>
          {errorMessage && (
            <p className={styles['error-text']}>{errorMessage}</p>
          )}
          {notes.length ? (
            <ol className={styles['task-list']}>
              {filteredNotes.map(({ id, title }) => (
                <li key={id} className={styles['task-item']}>
                  <div className={styles['task-content']}>
                    {idNoteModified === id ? (
                      <form
                        className={styles['edit-form']}
                        onSubmit={handleEditNote}
                      >
                        <input
                          className={styles['edit-input']}
                          type="text"
                          value={editNoteValue}
                          onBlur={() => setIdNoteModified(null)}
                          onChange={handleEditChange}
                        />
                      </form>
                    ) : (
                      <span className={styles['task-title']}>{title}</span>
                    )}
                    <div className={styles['buttons-container']}>
                      <Btn
                        className={styles['edit-button']}
                        onClick={() => editNote(id, title)}
                      >
                        Редактировать
                      </Btn>
                      <Btn
                        className={styles['delete-button']}
                        onClick={() => deleteNote(id)}
                      >
                        Удалить
                      </Btn>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles['empty-list-text']}>
              Добавьте Ваши новые задачи
            </p>
          )}
        </div>
      )}
    </div>
  )
}
