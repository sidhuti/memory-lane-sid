import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { CubeIcon } from '@heroicons/react/20/solid'
import GlobalStyles from './styles/GlobalStyles'
import MemoryLane from './pages/MemoryLane';
import './App.css'

function App() {
  return (
    <Router>
         <GlobalStyles />
    <Routes>
      <Route path="/" element={<MemoryLane />} />
    </Routes>
      {/* <div>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
          <div className='overflow-hidden rounded-lg bg-white shadow h-96'>
            <div className='px-4 py-5 sm:p-6'>
              <div className='flex items-center'>
                <CubeIcon className='h-16 w-16 inline-block' />
                <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'>
                  Memory lane
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Router>
  )
}

export default App
