export const getSkipValue = (limit, page) =>{
    console.log({limit, page})
    console.log((page - 1) * limit);
    return (page - 1) * limit;
}