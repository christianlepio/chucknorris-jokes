import React, {useEffect, useState} from 'react';
import './App.css';
import norrislogo from './chucknorris-logo.png'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])
  const [jokesToShow, setJokesToShow] = useState([])
  const [query, setQuery] = useState('all')
  const [category, setCategory] = useState([])
  let [pagination, setPagination] = useState(8)
  const [rates, setRates] = useState({
    id:[],
    likes:[],
    dislikes:[]
  })
  var catBtn = "cat-btn-"
  var numCatBtn = 0
  var tempJokes=[]
  let i = 0

//This function is to load more jokes
  const clickIncrement = () =>{
    setPagination(pagination+=5)
  }

//This is for fetching jokes from chucknorris api.
  const getJokes = async () =>{
    const fetchJokes = await axios.get('https://api.chucknorris.io/jokes/search?query=all')
    const fetchCategory = await axios.get('https://api.chucknorris.io/jokes/categories')
    const queryResponse = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
    setJokes(fetchJokes.data.result)
    setJokesToShow(queryResponse.data.result)
    setCategory(fetchCategory.data)
  }

  useEffect(() => {
    getJokes()
  }, [])

//search jokes function
  const handleSearch=(e)=>{
    e.preventDefault()
    getJokes();
    setPagination(8)
  }

  //This is for displaying jokes per category
  const displayCategory = (ucateg) =>{
    jokes.map((jk) =>{
      if(jk.categories == ucateg){
        tempJokes.push(jk)
      }
      setJokesToShow(tempJokes)
    } )
    setPagination(8)
  }

  //This is for like and dislike count
  const likeJoke = (idd) =>{
    const listID = rates.id
    const listLikes = rates.likes
    const listDislikes = rates.dislikes

    listID.push(idd)
    listLikes.push(1)
    listDislikes.push(0)

    setRates({...rates, id:listID, likes:listLikes, dislikes:listDislikes})
    
  };
  const dislikeJoke = (idd) =>{

    const listID = rates.id
    const listLikes = rates.likes
    const listDislikes = rates.dislikes

    listID.push(idd)
    listLikes.push(0)
    listDislikes.push(1)

    setRates({...rates, id:listID, likes:listLikes, dislikes:listDislikes})
    
  };

  return (
    <>
      <div className="container">
        <div className="nav">
          <div className='icon'>
            <img className='norris-logo' src={norrislogo} alt="Chuck-Norris-Logo"/>
            <ul></ul>
          </div>
          <div className='srch-joke'>
            <form onSubmit={handleSearch}>
              <input 
                type="text"
                className='srch-input'
                placeholder='Search Here:' 
                onChange={e=>setQuery(e.target.value)}
              />
              <button type='submit' className='srch-btn'><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </div>
        </div>
        <div className='cat-section'>
          <p>| C A T E G O R Y |</p>
          {
            category.map((ucateg)=>{
              if(ucateg !== 'animal' && ucateg !== 'fashion' && ucateg !== 'travel'){
                return(
                <button key={ucateg} type='button' className={catBtn+numCatBtn++} onClick={()=>displayCategory(ucateg)}>{ucateg}</button>
                )
              }
            })
          }
          <button key='uncategorized' type='button' className='cat-btn-13' onClick={()=>displayCategory('')}>Uncategorized</button>
        </div>
        <div className='joke-section'>
          {
            jokesToShow.slice(0, pagination).map((joke)=>{
              rates.id.map(idrate=>{
                if(idrate == joke.id){
                  i = rates.id.lastIndexOf(idrate)
                }
              })

              return(
              <div key={joke.id} className='card'>
                <div className='card-header'>
                  <h4><i className="fa-solid fa-face-grin-squint-tears"></i> {joke.categories == "" ? joke.categories = "uncategorized": joke.categories=joke.categories} JOKE <i className="laps fa-solid fa-face-grin-squint-tears"></i></h4>
                </div>
                <div className='card-body'>
                  <p>{joke.value}</p>
                </div>
                <div className='card-footer'>
                  <span className='likeCount' id='likeCount'>&nbsp;<span>{joke.id == rates.id[i] ? rates.likes[i]:0}</span>&nbsp;</span>
                  <button type='button' className='like-btn' onClick={()=>likeJoke(joke.id)}><i className="fa-solid fa-thumbs-up"/></button>
                  <button type='button' className='dislike-btn' onClick={ () => dislikeJoke(joke.id)}><i className="fa-solid fa-thumbs-down"/></button>
                  <span className='dislikeCount' id='dislikeCount'>&nbsp;<span>{joke.id == rates.id[i] ? rates.dislikes[i]:0}</span>&nbsp;</span>
                </div>
              </div>
            )})
          }
        </div>
        <div className='load-section'>
          {
            pagination >= jokesToShow.length ? <h5>---------- &nbsp; E N D &nbsp; O F &nbsp; J O K E S &nbsp; ----------</h5>:
            <button type='button' className='load-btn' onClick={clickIncrement}><i className="fa-solid fa-angles-down"/>&nbsp; LOAD MORE JOKES &nbsp;<i className="fa-solid fa-angles-down"/></button>
          }
        </div>
      </div>
    </>
  );
}

export default App;
