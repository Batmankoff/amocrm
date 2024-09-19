import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import Router from "./components/Router.jsx";
import './index.css'
import {TokenProvider} from "./components/TokenContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TokenProvider>
            <Router/>
        </TokenProvider>
    </StrictMode>,
)
