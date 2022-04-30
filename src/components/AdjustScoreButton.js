import { useDispatch } from 'react-redux';

import { setPlayerScore } from '../store/players';
import { withHistory } from '../store/history';



const AdjustScoreButton = ({ children, player, amount, title }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(withHistory(
      setPlayerScore(player.index, player.score + amount),
      setPlayerScore(player.index, player.score),
    ));
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
