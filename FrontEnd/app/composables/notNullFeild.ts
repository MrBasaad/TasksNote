export const notNullFeild = (...data:any[]) => {
  const isNullable = computed(()=>{
    return data.every(item=>{
      const val = unref(item);
      return val !== "" && val !== null && val !== undefined;
    });
  });
  return {isNullable};
}