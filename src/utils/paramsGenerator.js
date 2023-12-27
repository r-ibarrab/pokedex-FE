
const paramsGenerator = (limit,page,search) =>{
    let queryParam = ""
    if(!limit && !page && !search) return queryParam

    queryParam = "?"
    
    if(limit) queryParam = queryParam+`limit=${limit}`
    if(page) queryParam = queryParam+`&page=${page}`
    if(search) queryParam = queryParam+`&search=${search}`

    return queryParam
}

export default paramsGenerator