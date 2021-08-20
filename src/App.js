import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import MyApp from './components/MyApp';
import DevicesList from './components/DevicesList';
import AlertsTable from './components/AlertsTable';
import EditDevice from './components/EditDevice';
import AlertsByDevice from './components/AlertsByDevice';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <MyApp>
          <Switch>
            <Route exact path="/">
              <DevicesList />
            </Route>
            <Route exact path="/alerts">
              <AlertsTable />
            </Route>
            <Route exact path="/device/edit/:id">
              <EditDevice />
            </Route>
            <Route exact path="/device/alerts/:id">
              <AlertsByDevice />
            </Route>
          </Switch>
        </MyApp>
      </Provider>
    </Router>
  );
}

export default App;
