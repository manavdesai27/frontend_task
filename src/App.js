import Main from "./components/main";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers/rootReducers';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk),
)

function App() {
  return (
    <Provider store={store} >
      <div>
        <Main />
      </div>
    </Provider>
  );
}

export default App;
