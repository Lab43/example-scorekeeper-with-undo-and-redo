import { useDispatch } from 'react-redux';

import { setPlayerScore } from '../store/players';



const AdjustScoreButton = ({ player, amount, children }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPlayerScore(player.index, player.score + amount));
  }

  return (
    <button
      onClick={handleClick}
    >
      {children}
    </button>
  );

}

export default AdjustScoreButton;
