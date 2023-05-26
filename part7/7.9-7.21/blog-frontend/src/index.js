import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import store from './store'
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './context';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(


<Router>
<QueryClientProvider client={queryClient}>
<ContextProvider>
<Provider store={store}>
<App />
</Provider>
</ContextProvider>
</QueryClientProvider>
</Router>
)