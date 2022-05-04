import { useDispatch, useSelector } from 'react-redux';

import { addPlayer, removePlayer, restorePlayer } from '../store/players';
import { addHistory } from '../store/history';



const AddPlayerButton = () => {

  const dispatch = useDispatch();

  const newPlayerIndex = useSelector((state) => state.players.length);

  const handleClick = () => {
    // create the player
    dispatch(addPlayer());
    dispatch(addHistory(
      // restore the deleted player when the redo button is hit
      restorePlayer(newPlayerIndex),
      // delete (mark as "removed") the player when the undo button is hit
      removePlayer(newPlayerIndex),
    ));
  }

  return (
    <button
      onClick={handleClick}
      className='add-player'
    >
      Add Player
    </button>
  );

}

export default AddPlayerButton;
