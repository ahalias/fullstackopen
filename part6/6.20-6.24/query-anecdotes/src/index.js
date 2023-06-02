import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContextProvider } from './context'


import App from './App'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
  </ContextProvider>

)