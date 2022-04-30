import { useSelector } from 'react-redux';

import Loading from './Loading';
import Scoreboard from './Scoreboard';



const App = () => {

  const { loading } = useSelector((state) => state.system);

  return (
    <>
      <h1>Scorekeeper</h1>
      {loading
        ? <Loading />
        : <Scoreboard />
      }
    </>
  );

}

export default App;
