import type { Dispatch, SetStateAction } from 'react';

import { updateRepository } from '../reducers/SearchSlice';
import { fetchRecentRevisions } from '../thunks/searchThunk';
import type { Repository } from '../types/state';
import { useAppDispatch } from './app';

function useHandleChangeDropdown() {
  const dispatch = useAppDispatch();

  const handleChangeDropdown = async (e: React.MouseEvent<HTMLLIElement>, displayList: Dispatch<SetStateAction<boolean>>) => {
    const repository = e.currentTarget.id;

    dispatch(updateRepository(repository as Repository['name']));

    // Fetch 10 most recent revisions when repository changes
    await dispatch(fetchRecentRevisions(repository as Repository['name']));
    displayList(true);
  };
  return { handleChangeDropdown };
} 

export default useHandleChangeDropdown;
