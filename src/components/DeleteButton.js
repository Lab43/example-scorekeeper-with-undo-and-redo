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
    >
      Delete
    </button>
  );

}

export default DeleteButton;
