import RootRouter from '@/router/RootRouter'
import store, { persistor } from '@/stores/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootRouter />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
