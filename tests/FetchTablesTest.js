import gql from 'graphql-tag'
import { client } from '../src/apolloClient/ApolloClient'
import React from 'react';
import { Query,graphql,compose  } from 'react-apollo'

export function query1(){
    client.query({
        query: gql`{
          query jobs{
             getJobs(from:"18-09-01",to:"18-09-10"){
                 jobMstrId

                       }
                 }

                }`
    }).then(result => console.log(result));
}


export const TEST_SPRING = gql`
           query jobs{
              getJobs(from:"18-09-01",to:"18-09-10"){
                  jobMstrId

                        }
                  }
`;

export const {GET_CACHE} = gql`
  query getcache {
          detailsTable @client{
                  open
                  detailsTableCurrentDates
            }
  }
`;

export const GetCache = () => (
  <Query query={TEST_SPRING} variables={{from:"18-09-01",to:"18-09-10"}}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return <div>{data}</div>
    }}
  </Query>
);


  const  gqlJOB_MASTER =   gql` query($from:String, $to:String){
                                 getJobs(from:$from, to:$to ){
                        		           jobMstrId
                                  		 jobDetailses {
                                  				 	      polNo
                                  				 	}
		                              }
                               }`



export default gqlJOB_MASTER
