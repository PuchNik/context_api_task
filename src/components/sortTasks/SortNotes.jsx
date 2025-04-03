import { useContext } from 'react';
import { AppContext } from '../../../context';

export const SortNotes = () => {
  const { notes, setNotes } = useContext(AppContext);

  const sortedNotes = () => {
    const sortedTasks = [...notes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
    setNotes(sortedTasks);
  };

  return {
    sortedNotes,
  };
};
