# CHUCKNORRIS-JOKES
##### ReactJS app with Chucknorris API integration

---

###  P L A N 

- Install node js and react js
- Study how to use axios http library and how it works.
- Study and explore chucknorris API.
- Design the front-end of your web project it must be responsive to any kind of devices.

- Fetch all jokes from chucknorris API using axios.get('https://api.chucknorris.io/jokes/search?query=all').
- Store all jokes to state array variable "jokes".
- Fetch all available categories in chucknorris API using axios.get('https://api.chucknorris.io/jokes/categories').
- Store all fetched categories to state variable "category".
- Fetch all jokes result from chucknorris API using axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
   and store it to a state variable "jokesToShow"
- The default value of the state variable "query" is "all".
- The codes below is to display jokes and it depends on what "jokesToShow" variable value is. This will also 
   include the like and dislike buttons...
