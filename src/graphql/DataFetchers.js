import React from "react";
import { Query,graphql,compose  } from 'react-apollo'
import { FETCH_MAIN_DATA } from './Queries'
import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { httpLink } from './ApolloClient'




export const API_setReportsData = (operation) =>
    makePromise(execute(httpLink, operation))
            .then(data => data)
            .catch(error => console.log(error));
