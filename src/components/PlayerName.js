import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setPlayerName } from '../store/players';



const PlayerName = ({ player }) => {

  const dispatch = useDispatch();

  const [ editedName, setEditedName ] = useState(player.name);

  // store the new name as it's being edited
  const handleChange =(e) => {
    setEditedName(e.target.value);
  }

  // when the user clicks out of the input field check if the name has been changed then update the redux store
  const handleBlur = () => {
    if (player.name !== editedName) {
      dispatch(setPlayerName(player.index, editedName));
    }
  }

  // submit the changes when the user hits enter in the input field by blurring the focus
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur();
  }

  return (
    <input
      value={editedName}
      placeholder={`Player ${player.index + 1}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );

}

export default PlayerName;
