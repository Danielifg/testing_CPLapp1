const { execute, makePromise } = require ('./apollo-link')
const { HttpLink } = require ('./apollo-link-http')

export const httpLink = new HttpLink({
    uri: TEST_SERVER,
    headers: {
      ContentType: `application/json`,
      AccessControlAllowOrigin: `hhtp://localhost:8080`,
      Accept:`application/json`
    },
  });

  const operation = {
    query: FETCH_MAIN_DATA,
    variables: {from, to}
  }


  export const API_setReportsData = (operation) =>
      makePromise(execute(httpLink, operation))
              .then(data => console.log(data))
              .catch(error => console.log(error));



  export const FETCH_MAIN_DATA = gql`query data($from:String, $to:String){
                                	getJobs(from:$from, to:$to){
                                			jobMstrId
                                			lstUpdtTm
                                			strtTm
                                			endTm
                                			exctnEnvrmnt
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
