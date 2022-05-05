import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPlayerName } from '../store/players';



const PlayerName = ({ player }) => {

  const dispatch = useDispatch();

  // We don't want to update the Redux store repeatedly as a player edits a name because that will trigger a bunch of extra API calls, so we use React's useState hook to store the name locally then only update the store when the user is done editing (when they click outside of the input field).

  const [ name, setName ] = useState(player.name);

  const handleChange =(e) => {
    setName(e.target.value);
  }

  const handleBlur = () => {
    if (player.name !== name) {
      dispatch(setPlayerName(player.index, name));
    }
  }

  // The user will also expect the changes to be applied when they hit enter. We can accomplish this by bluring focus on the input when the enter key is pressed.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur();
  }

  // We need to watch the player prop that's getting passed into the component for changes to the name.
  useEffect(() => {
    setName(player.name);
  }, [player.name]);

  return (
    <input
      value={name}
      placeholder={`Player ${player.index + 1}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );

}

export default PlayerName;
