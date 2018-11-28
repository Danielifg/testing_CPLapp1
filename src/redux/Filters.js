


 function filter_differences(jobsArray){
   jobsArray.map((value,index,arr) => {
      const current = value;
      const next =  arr[index + 1];
      const longerNext = next? current.jobDetailses.length < ( next && next.jobDetailses.length)? true: false : null;
      const differences = [];
      const TRANSACTION_NOT_IN_FORCE = "ContractVersion.Id=null";
 
  if(longerNext && next){

    const currentPolicyNumbers = current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo);

    next.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').forEach((data, index, arr)=> {
      if(!currentPolicyNumbers.includes(data.polNo)){
            if(data.exctnMsg.search(TRANSACTION_NOT_IN_FORCE) < 1){
                  differences.push(data)
              }
            }
         })
  } else {
    if(next){
       const nextPolicyNumbers = next.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo)
       current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').forEach((data, index, arr)=> {
          if(!nextPolicyNumbers.includes(data.polNo)){
            if(data.exctnMsg.search(TRANSACTION_NOT_IN_FORCE) < 1){
                  differences.push(data)
              }
            }
        })
      }
    }
    console.log(differences)
    return differences;
  })
}

export default filter_differences;