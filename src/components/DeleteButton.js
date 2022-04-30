import { useDispatch } from 'react-redux';

import { removePlayer, restorePlayer } from '../store/players';
import { addHistory } from '../store/history';



const DeleteButton = ({ player }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removePlayer(player.index));
    dispatch(addHistory(removePlayer(player.index), restorePlayer(player.index)));
  }

  return (
    <button
      onClick={handleClick}
      className='delete'
      title='Delete Player'
    >
      🗑️
    </button>
  );

}

export default DeleteButton;
