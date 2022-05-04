import { useSelector, useDispatch } from 'react-redux';

import { undo } from '../store/history';



const UndoButton = () => {

  const dispatch = useDispatch();

  // disable the button when there are no actions to undo
  const disabled = useSelector((state) => (
    state.history.cursor === -1
  ));

  const handleClick = () => {
    dispatch(undo());
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
    >
      ⏪ Undo
    </button>
  );
}

export default UndoButton;
