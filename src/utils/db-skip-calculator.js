export const getSkipValue = (limit, page) =>{
    return (page - 1) * limit;
}