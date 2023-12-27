import paramsGenerator from '../utils/paramsGenerator'

const baseUrl = "http://127.0.0.1:3002/api/pokemons/"

const getAllPokemons = async (limit,page,search) =>{
    let error = false
    let data = ""

    try{
        const response = await fetch(baseUrl +paramsGenerator(limit,page,search))
        data = await response.json()
        data = data.data
    }catch(e){
        error = true
        data = e.message
    }

    return { error,data}
    
}

export default {getAllPokemons}