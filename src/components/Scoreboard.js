import Players from './Players';
import AddPlayerButton from './AddPlayerButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';



const Scoreboard = () => {
  return (
    <>
      <Players />
      <AddPlayerButton />
      <div className='history'>
        <UndoButton />
        <RedoButton />
      </div>
    </>
  );
}

export default Scoreboard;
