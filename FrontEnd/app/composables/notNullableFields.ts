export function notNullFeild(...data:unknown[]):boolean  {
  let isNullable:boolean = false
  data.forEach( d=> {
    if (d !== null && d !== undefined) {
      return isNullable= false
    } else {
      return (isNullable = true)
    }
  })
  return isNullable
}
