import { useSelector } from 'react-redux';

import PlayerName from './PlayerName';
import DeleteButton from './DeleteButton';
import AdjustScoreButton from './AdjustScoreButton';



const Players = () => {

  const players = useSelector((state) => state.players);

  const sorted = players
    // keep track of the pre-sorted index, which the nested components will need to update the players
    .map((player, index) => ({...player, index}))
    // sort the players
    .sort((a, b) => {
      if (a.score === b.score) {
        // if the scores match, sort alphabetically
        return a.name.localeCompare(b.name);
      } else {
        // otherwise sort by score
        return b.score - a.score;
      }
    })
  ;

  return (
    <ul>
      {sorted.map((player) => (
        !player.removed &&
        <li
          key={player.index}
          className={sorted[0].score === player.score ? 'winning' : ''}
        >
          <PlayerName player={player} />
          <div className='score'>
            {player.score}
          </div>
          <AdjustScoreButton
            player={player}
            amount={1}
            title='Increase Score'
          >
            ⬆️
          </AdjustScoreButton>
          <AdjustScoreButton
            player={player}
            amount={-1}
            title='Decrease Score'
          >
            ⬇️
          </AdjustScoreButton>
          <DeleteButton player={player} />
        </li>
      ))}
    </ul>
  );

}

export default Players;
