import { useSelector } from 'react-redux';



const Players = () => {

  const players = useSelector((state) => state.players);

  return (
    <ul>
      {players.map((player, index) => (
        !player.removed &&
        <li key={index}>
          {player.name}
        </li>
      ))}
    </ul>
  )

}

export default Players;
