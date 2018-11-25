import gql from 'graphql-tag'
import dateformat from 'dateformat'

export const format = (date) => dateformat(date,'yyyy-mm-dd');

export default gql`
  query {
    detailsTable @client {
      open
      detailsTableCurrentDates
    }
  }
`
export const FETCH_MAIN_DATA = gql`query data($from:String, $to:String){
                  	getJobs(from:$from, to:$to){
                  			jobMstrId
                        exctnStrtTm
                  			lstUpdtTm
                  			strtTm
                  			endTm
                  			exctnEnvrmnt
                        exctnStrtTm
                  			exctnSts
                  			jobMstrNm
                  			prcsdCntr
                  			jobDetailses{
                      					jobDtlId
                      					lstUpdtTm
                      					polNo
                      					cntrctExpryDt
                      					uuid
                      					prcsdCd
                      					exctnDtTm
                                exctnMsg
                  					}
                  	   	}
                      }`

/*
export const getDataWithFetch = createApolloFetch({ uri:'http://localhost:8080/graphql'});
fetch({ query:INIT_QUERY, variables:{from:from,to:to},}).then(res => { console.log(res.data) })
.catch(function(error){  console.log(error) });


export const getDataWithFetch1 = () =>
fetch('http://localhost:8080/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Access-Control-Allow-Origin':'*'
  },
  body: JSON.stringify({	INIT_QUERY , variables: { from ,to } } )
})
.then(response => response.json())
  .then(function(data){
	  console.log("STW --> ",data)
	  return  data
	})


  HandleInitDataFetching = ({ from,to }) => (
  <Query query={FETCH_MAIN_DATA} variables={{  from, to }}>
     {({ loading, error, data }) => {
       if (loading)
          return <h1>Loading from DataFetcher ...</h1>
       if (error)
           return `Error!: ${error}`;
       if(data.getJobs.length<1){  return <h1>No Reports Available </h1> }
        console.log(data.getJobs);
        let { getJobs } = data
        this.props.setReportsData(getJobs)
       return null
     }}
   </Query>
  );

  */
