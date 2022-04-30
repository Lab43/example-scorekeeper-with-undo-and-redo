import { useDispatch } from 'react-redux';

import { setPlayerScore } from '../store/players';



const AdjustScoreButton = ({ children, player, amount, title }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPlayerScore(player.index, player.score + amount));
  }

  return (
    <button
      onClick={handleClick}
      title={title}
    >
      {children}
    </button>
  );

}

export default AdjustScoreButton;
