import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {CssBaseline} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },

})
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <ThemeProvider theme={darkTheme}>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
