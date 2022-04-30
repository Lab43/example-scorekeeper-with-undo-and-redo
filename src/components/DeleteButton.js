import { useDispatch } from 'react-redux';

import { removePlayer } from '../store/players';



const DeleteButton = ({ player }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removePlayer(player.index));
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
