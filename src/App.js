import React,{useEffect, useState} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pokedexService from './services/pokedexService'
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';


const App = () => {

    const [limit, setLimit] = useState("");
    const [page, setPage] = useState("");
    const [search, setSearch] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const showAlert = (msg) =>{
        setErrorMessage(msg)
        setTimeout(()=>{
            setErrorMessage("")
        },1500 )
    }

    const clearFilters = () =>{
        setLimit("")
        setPage("")
        setSearch("")
    }

    const fetchData = async () => {
        const serviceResponse = await pokedexService.getAllPokemons(limit,page,search)
        if(serviceResponse.error) return showAlert(serviceResponse.data)
        
        setPokemons(serviceResponse.data)
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
   <>
   
   <Navbar expand="lg" className="bg-body-tertiary" >
        <Container className='d-flex justify-content-center' fluid>
            <Navbar.Brand >Pokedex</Navbar.Brand>
        </Container>
    </Navbar>
    <div className="app d-flex flex-column align-items-center">
    {   errorMessage &&
        <Alert variant="danger">
            {errorMessage}
        </Alert>
    }
   
    <div className="app__form-container px-1 pt-2">
        <Form className='d-flex justify-content-center gap-2 flex-wrap'>
            <Form.Group className="mb-1 " controlId="formBasicEmail">
                <Form.Label>Limit</Form.Label>
                <Form.Control onChange={(e)=>setLimit(e.target.value)} value={limit} type="number" placeholder="20" />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Page</Form.Label>
                <Form.Control onChange={(e)=>setPage(e.target.value)}  value={page} type="number" placeholder="1" />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Search for a Pokemon</Form.Label>
                <Form.Control onChange={(e)=>setSearch(e.target.value)}  value={search} type="text" placeholder="Pikachu,Charmeleon, etc..." />
            </Form.Group>
          
        </Form>
    </div>
    <div className="app__button-container mt-4 d-flex gap-3">
        <Button onClick={fetchData} >
        Search
        </Button>
        <Button variant="secondary" onClick={clearFilters} >
            Clear Filters
        </Button>

    </div>
   <div className="app__list-container mt-4" style={{width:"90%"}}>
        <ListGroup>
            {
                pokemons ?
                pokemons.map((pokemon)=>{
                    
                    return(
                        <ListGroup.Item>{pokemon.name}</ListGroup.Item>
                    )
                })
                :
                <p>Apparently the Pokemon(s) you are looking for is hard to find :(</p>
            }
            
        </ListGroup>
   </div>


    </div>
    </>
  )
}

export default App