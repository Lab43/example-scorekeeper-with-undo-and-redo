import { useSelector } from 'react-redux';

import Scoreboard from './Scoreboard';



const App = () => {

  const { loading } = useSelector((state) => state.system);

  return (
    loading
      ? <h1>Loading...</h1>
      : <Scoreboard />
  );

}

export default App;
