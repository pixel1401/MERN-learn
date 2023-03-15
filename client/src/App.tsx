import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { BrowserRouter, Navigate, Route , Routes  } from 'react-router-dom';
import HomePage from '@/scenes/Home';
import LoginPage from './scenes/LoginPage';
import ProfilePage from './scenes/ProfilePage';
import {CssBaseline , ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles"
import {themeSettings} from "@/theme"; 


function App() {
  const mode = useAppSelector(state => state.authSlice.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)) , [mode])

  const isAuth = Boolean(useAppSelector((state) => state.authSlice.token));



  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path={'/'}  element={<LoginPage/>} />
          <Route path={'/home'}  element={ isAuth ? <HomePage/> :  <Navigate to="/" /> } />
          <Route path={'/profile/:userId'}  element={ isAuth ? <HomePage/> :  <Navigate to="/" /> }  />
        </Routes>
      </ThemeProvider>
  )
}

export default App
