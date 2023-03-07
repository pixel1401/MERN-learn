import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { increment } from './redux/features/counterSlice';
import { BrowserRouter, Route , Routes  } from 'react-router-dom';
import HomePage from '@/scenes/Home';
import LoginPage from './scenes/LoginPage';
import ProfilePage from './scenes/ProfilePage';

function App() {
  // const [count, setCount] = useState(0)

  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();


  const setCount = ()=> {
      dispatch(increment())
  }


  return (
        <Routes>
          <Route path={'/'}  element={<LoginPage/>} />
          <Route path={'/home'}  element={<HomePage/>} />
          <Route path={'/profile/:userId'}  element={<ProfilePage/>} />
        </Routes>
  )
}

export default App
