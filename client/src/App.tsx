import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/scenes/HomePage';
import LoginPage from './scenes/LoginPage';
import ProfilePage from './scenes/ProfilePage';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "@/theme";
import ChatPage from './scenes/ChatPage/ChatPage';
import Layout from './scenes/Layout';


function App() {
  const mode = useAppSelector(state => state.authSlice.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const isAuth = Boolean(useAppSelector((state) => state.authSlice.token));



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path={'/auth'} element={<LoginPage />} />
        {/* <Route path={'/home'} element={isAuth ? <Layout /> : <Navigate to="/" />} /> */}
        <Route path={'/'}  element={isAuth ? <Layout /> : <Navigate to="/auth" />}>
          <Route index element={<HomePage />} />
          <Route path={'profile/:userId'} element={<HomePage />} />
          <Route path={'chat'} element={<ChatPage />} />
        </Route>
        {/* <Route path={'/profile/:userId'}  element={ isAuth ? <HomePage/> :  <Navigate to="/" /> }  /> */}
      </Routes>
    </ThemeProvider>
  )
}

export default App
