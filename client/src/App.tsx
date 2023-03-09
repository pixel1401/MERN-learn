import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { BrowserRouter, Route , Routes  } from 'react-router-dom';
import HomePage from '@/scenes/Home';
import LoginPage from './scenes/LoginPage';
import ProfilePage from './scenes/ProfilePage';
import {CssBaseline , ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles"
import {themeSettings} from "@/theme"; 


function App() {
  const mode = useAppSelector(state => state.authSlice.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)) , [mode])




  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path={'/'}  element={<LoginPage/>} />
          <Route path={'/home'}  element={<HomePage/>} />
          <Route path={'/profile/:userId'}  element={<ProfilePage/>} />
        </Routes>
      </ThemeProvider>
  )
}

export default App
