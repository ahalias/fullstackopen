import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

const store = configureStore( {reducer: reducer} )

const App = () => {

  const good = () => {
    console.log(store.getState())

    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad = () => {
    console.log(store.getState())

    store.dispatch({
      type: 'BAD'
    })
  }

  const ok = () => {
    console.log(store.getState())

    store.dispatch({
      type: 'OK'
    })
  }

  const reset = () => {
    console.log(store.getState())

    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
