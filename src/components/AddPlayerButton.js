import { useDispatch, useSelector } from 'react-redux';

import { addPlayer, removePlayer, restorePlayer } from '../store/players';
import { addHistory } from '../store/history';



const AddPlayerButton = () => {

  const dispatch = useDispatch();

  const newPlayerIndex = useSelector((state) => state.players.length);

  const handleClick = () => {
    dispatch(addPlayer());
    dispatch(addHistory(restorePlayer(newPlayerIndex), removePlayer(newPlayerIndex)));
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
