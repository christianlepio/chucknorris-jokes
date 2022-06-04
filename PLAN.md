# CHUCKNORRIS-JOKES
##### ReactJS app with Chucknorris API integration

---

###  P L A N 

- Install node js and react js
- Study how to use axios http library and how it works.
- Study and explore chucknorris API.
- Design the front-end of your web project it must be responsive to any kind of devices.

- Fetch all jokes from chucknorris API using 

```js
axios.get('https://api.chucknorris.io/jokes/search?query=all')
```

- Store all jokes to state array variable "jokes".
- Fetch all available categories in chucknorris API using 

```js
axios.get('https://api.chucknorris.io/jokes/categories')
```
- Store all fetched categories to state variable "category".
- Fetch all jokes result from chucknorris API using 

```js
axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
```

   and store it to a state variable "jokesToShow".
- The default value of the state variable "query" is "all".
- The codes below is to display jokes and it depends on what "jokesToShow" variable value is. This will also 
   include the like and dislike buttons...
   
   ```js
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
   ```

-- I decided to slice the number of value of the state variable "jokesToShow".

-- The codes below is for load more button...

        <div className='load-section'>
          {
            pagination >= jokesToShow.length ? <h5>---------- &nbsp; E N D &nbsp; O F &nbsp; J O K E S &nbsp; ----------</h5>:
            <button type='button' className='load-btn' onClick={clickIncrement}><i className="fa-solid fa-angles-down"/>&nbsp; LOAD MORE JOKES &nbsp;<i className="fa-solid fa-angles-down"/></button>
          }
        </div>
	
	//Load more button function. This will increase the value of pagination variable to 5.

	const clickIncrement = () =>{
	  setPagination(pagination+=5)
  	}

-- The codes below is for like and dislike count or score function.
   
  //This is for like count function...

  const likeJoke = (idd) =>{
    const listID = rates.id
    const listLikes = rates.likes
    const listDislikes = rates.dislikes

    listID.push(idd)
    listLikes.push(1)
    listDislikes.push(0)

    setRates({...rates, id:listID, likes:listLikes, dislikes:listDislikes})
  };

  //This is for dislike count function...

  const dislikeJoke = (idd) =>{

    const listID = rates.id
    const listLikes = rates.likes
    const listDislikes = rates.dislikes

    listID.push(idd)
    listLikes.push(0)
    listDislikes.push(1)

    setRates({...rates, id:listID, likes:listLikes, dislikes:listDislikes})
  };

-- The codes below is to display all buttons for various categories from chucknorris API...
        
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

-- The codes below is to store all jokes to its specific categories and also to change the value of "jokesToShow" variable.
   All jokes that doesn't have its category will be categorized as "Uncategorized".

  const displayCategory = (ucateg) =>{
    jokes.map((jk) =>{
      if(jk.categories == ucateg){
        tempJokes.push(jk)
      }
      setJokesToShow(tempJokes)
    } )
    setPagination(8)
  }

-- For searching jokes I used axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`) to fetch all possible results.
   Below is the code...
	
	//This is for search input and button...

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

	//This is for search function...

  	const handleSearch=(e)=>{
	    e.preventDefault()
	    getJokes();
	    setPagination(8)
	}
