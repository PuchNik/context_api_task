import styles from './MainPage.module.css';
import { useContext } from 'react';
import { AppContext } from '../../../context.js';
import {
  SortNotes,
  SearchNote,
  useRequestDelete,
  useRequestGet,
  useRequestPost,
  useRequestPut,
  Btn,
} from '../index.js';

function MainPage() {
  const { notes } = useContext(AppContext);

  const {isLoading} = useRequestGet();

  const {
    addNewTask,
    taskValue,
    handleInputChange,
    handleAddTask,
    errorMessage,
  } = useRequestPost();

  const {
    editTask,
    idTaskModified,
    setIdTaskModified,
    handleEditChange,
    editTaskValue,
    handleEditTask,
  } = useRequestPut();

  const { deleteTask } = useRequestDelete();
  const { searchValue, handleSearchNote, filteredNotes } = SearchNote();
  const { sortedNotes } = SortNotes();

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
                <form className={styles['task-form']} onSubmit={handleAddTask}>
                  <input
                      className={styles['task-input']}
                      type="text"
                      placeholder="Записать задачу..."
                      value={taskValue}
                      onChange={handleInputChange}
                  />
                </form>
                <Btn
                    className={styles['add-button']}
                    onClick={addNewTask}
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
                            {idTaskModified === id ? (
                                <form
                                    className={styles['edit-form']}
                                    onSubmit={handleEditTask}
                                >
                                  <input
                                      className={styles['edit-input']}
                                      type="text"
                                      value={editTaskValue}
                                      onBlur={() => setIdTaskModified(null)}
                                      onChange={handleEditChange}
                                  />
                                </form>
                            ) : (
                                <span className={styles['task-title']}>{title}</span>
                            )}
                            <div className={styles['buttons-container']}>
                              <Btn
                                  className={styles['edit-button']}
                                  onClick={() => editTask(id, title)}
                              >
                                Редактировать
                              </Btn>
                              <Btn
                                  className={styles['delete-button']}
                                  onClick={() => deleteTask(id)}
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
  );
}

export default MainPage;
