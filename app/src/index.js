import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from 'apollo-boost';

import { Provider } from "react-redux";
import store from "./redux/store/configureStore";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Pointsboard";
import Compair from "./pages/Comparasion";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Quiz from "./pages/Quiz";
import Locked from "./containers/Locked";
import App from "./containers/App";
import { ApolloProvider } from 'react-apollo';
import { RMWCProvider, ThemeProvider } from "rmwc";
import "./styles/app.css";

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});


ReactDOM.render(
    <RMWCProvider>
        <ThemeProvider
            options={{
                primary: "#6200ee",
                secondary: "#03dac4",
                error: "#b00020"
            }}
        >

<ApolloProvider client={client}>
            <Provider store={store}>
                <Router>

                    
                    <App>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/sign-up" component={Signup} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/about" component={About} />
                            <Locked>
                                <Switch>
                                    <Route
                                        exact
                                        path="/leaderboard"
                                        component={Leaderboard}
                                    />

                                    <Route
                                        exact
                                        path="/compair"
                                        component={Compair}
                                    />

                                    <Route
                                        exact
                                        path="/dashboard"
                                        component={Dashboard}
                                    />
                                    <Route
                                        exact
                                        path="/play/:quizId"
                                        component={Quiz}
                                    />
                                    <Redirect to="/" />
                                </Switch>
                            </Locked>
                        </Switch>
                    </App>
                </Router>
            </Provider>
            </ApolloProvider>
        </ThemeProvider>
    </RMWCProvider>,
    document.getElementById("root")
);
