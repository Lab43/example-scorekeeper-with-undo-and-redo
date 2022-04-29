import { useDispatch } from 'react-redux';

import { addPlayer } from '../store/players';



const AddPlayerButton = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addPlayer());
  }

  return (
    <button onClick={handleClick}>
      Add Player
    </button>
  );

}

export default AddPlayerButton;
