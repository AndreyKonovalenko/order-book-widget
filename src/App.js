import Widget from './components/Widget';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Widget />;
    </Provider>
  );
};

export default App;
