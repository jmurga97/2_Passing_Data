import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
Display a list of movies where each movie contains a list of users that favorited it.

For detailed instructions, refer to instructions.md.
*/

const profiles = [
  {
    id: 1,
    userID: '1',
    favoriteMovieID: '1',
  },
  {
    id: 2,
    userID: '2',
    favoriteMovieID: '1',
  },
  {
    id: 3,
    userID: '4',
    favoriteMovieID: '5',
  },
  {
    id: 4,
    userID: '5',
    favoriteMovieID: '2',
  },
  {
    id: 5,
    userID: '3',
    favoriteMovieID: '5',
  },
  {
    id: 6,
    userID: '6',
    favoriteMovieID: '4',
  },
];

const users = {
  1: {
    id: 1,
    name: 'Jane Jones',
    userName: 'coder',
  },
  2: {
    id: 2,
    name: 'Matthew Johnson',
    userName: 'mpage',
  },
  3: {
    id: 3,
    name: 'Autumn Green',
    userName: 'user123',
  },
  4: {
    id: 3,
    name: 'John Doe',
    userName: 'user123',
  },
  5: {
    id: 5,
    name: 'Lauren Carlson',
    userName: 'user123',
  },
  6: {
    id: 6,
    name: 'Nicholas Lain',
    userName: 'user123',
  },
};

const movies = {
  1: {
    id: 1,
    name: 'Planet Earth',
  },
  2: {
    id: 2,
    name: 'Selma',
  },
  3: {
    id: 3,
    name: 'Million Dollar Baby',
  },
  4: {
    id: 4,
    name: 'Forrest Gump',
  },
  5: {
    id: 5,
    name: 'Get Out',
  },
};

function moviePeopleList(){
	const moviePeople = new Map();
  	const moviesKeys = Object.keys(movies);
  	
  	for(const movieKey of moviesKeys){
      	const noOneLiked = "None of the current users liked this movie"
    	moviePeople.set(movieKey, 
        	profiles
                .map(profile => {
        			if(profile.favoriteMovieID === movieKey){
                    	return users[profile.userID].name;
                    }else{
                    	return noOneLiked;
                    }
        		})
                .filter(profile => {
          			return profile !== noOneLiked
        		})
                
        )
    }
  	moviePeople.forEach((value, key) =>{
    	if(value.length === 0){
        	moviePeople.set(key,"None of the current users liked this movie");
        }
    })
  	return moviePeople;
}

class MovieList extends Component{
	render(){
        const moviesValues = Object.values(this.props.movies);
      	const profiles = this.props.profiles;
      	const users = this.props.users;
      	profiles.filter(profile => users[profile.userID].id)
      	
    	return(
          <div>
            {moviesValues.map((movie) => (
          	<div>
        		<h2 key={movie.id}>{movie.name}</h2>
          		<p>Liked by:</p>
          		
          		<UserList userList = {moviePeopleList()} movieID={movie.id} />
          	</div>
        	))}
		  </div>
        );
    }
}
class UserList extends Component{
	render(){
      	const movieID = this.props.movieID.toString();
      	const userList = this.props.userList;
      	let users = [];
		if(userList.has(movieID)){
        	users = userList.get(movieID);
          	//console.log(users);
        }
      	function getPeople(){
        	return Array.isArray(users) 
              ? users.map(user => <li>{user}</li>)
              : <li> 'No One Liked' </li>
        }
            console.log(getPeople());
    	return(
        	<ol>
          		{getPeople()}
          	</ol>
        )
    }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <h2>How Popular is Your Favorite Movie?</h2>
		<MovieList movies={movies} profiles={profiles} users={users}/>
      </div>
    );
  }
}

export default App;
