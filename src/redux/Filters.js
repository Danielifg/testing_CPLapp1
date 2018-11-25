


export function getFixedErros(value,index,arr,fixedErrorsArr){
   const current = value;
   const next =  arr[index + 1];
  if(next){
    const currentPolicyNumbers = current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo)
    next.jobDetailses.filter(i=>i.prcsdCd === 'COMPLETED').forEach((data, index, arr)=> {
      if(currentPolicyNumbers.includes(data.polNo)){
             fixedErrorsArr.push(data)
         }
      })
    }
}
