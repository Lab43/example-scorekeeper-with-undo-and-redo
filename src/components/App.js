import { useSelector } from 'react-redux';

import Loading from './Loading';
import Scoreboard from './Scoreboard';
import Footer from './Footer';



const App = () => {

  const { loading } = useSelector((state) => state.system);

  return (
    <>
      <div className='card'>
        <h1>Scorekeeper</h1>
        {loading
          ? <Loading />
          : <Scoreboard />
        }
      </div>
      <Footer />
    </>
  );

}

export default App;
