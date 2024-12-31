import Header from '../components/Header';
import MemoryList from '../components/MemoryList';
import NewMemoryButton from '../components/NewMemoryButton';
import Dropdown from '../components/Dropdown';

const MemoryLane = () => (
  <div>
    <Header />
    <Dropdown />
    <MemoryList />
    <NewMemoryButton />
  </div>
);

export default MemoryLane;
