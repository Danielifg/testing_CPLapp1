import gql from 'graphql-tag'

export default gql`
  query {
    detailsTable @client {
            open
            detailsTableCurrentDates
    }
  }
`
