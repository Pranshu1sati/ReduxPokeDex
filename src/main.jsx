import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {store} from './store/store.js'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { fetchFilter } from './store/features/infiniteScrollSlice.js'
store.dispatch(fetchFilter())
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ChakraProvider>
<Provider store={store}>
    <App />
</Provider>
</ChakraProvider>
  </React.StrictMode>,
)
