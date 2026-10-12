import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'

const tema = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    background: { default: '#eef3f8' },
  },
  shape: { borderRadius: 12 },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
