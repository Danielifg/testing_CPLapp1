import React from "react";
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader'
import Login from './layouts/Login'
import { ApolloProvider } from 'react-apollo'
import MainAppBar from './components/MainAppBar/MainAppBar'
import Reports from './layouts/Reports'
import { BrowserRouter,Route,Switch } from "react-router-dom"
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import Grid from '@material-ui/core/Grid';
import reducers from './redux/reducers'
import { client } from './graphql/ApolloClient'
import { createBrowserHistory } from 'history'
const initialState = {
  showDetails:false,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore (
  reducers,
  initialState,
  composeEnhancers(
      applyMiddleware(thunk)
      )
  );

class App extends React.Component {
  constructor(props){
    super(props)
    //gqlJOB_MASTER();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                  <Switch>
                          <Route exact path="/" component={ Login } />
                          <Route exact path="/:userName" render={() => (
                                          <div>
                                              <Grid container  >
                                                  <Grid item xs={12}  >
                                                  <MainAppBar/>
                                                  </Grid>

                                                  <Grid item lg={12} style={{marginTop:'2em'}}>
                                                      <Reports/>
                                                  </Grid>

                                              </Grid>
                                          </div>
                              )}/>
                    </Switch>
            </BrowserRouter>
         </Provider>
      </ApolloProvider>

      );
  }
}

const AppWithHot = hot(module)(App);

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);
