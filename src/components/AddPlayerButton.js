import { useDispatch } from 'react-redux';

import { addPlayer } from '../store/players';



const AddPlayerButton = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addPlayer());
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
