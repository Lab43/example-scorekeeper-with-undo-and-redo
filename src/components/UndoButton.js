import { useSelector, useDispatch } from 'react-redux';

import { undo } from '../store/history';



const UndoButton = () => {

  const dispatch = useDispatch();

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
