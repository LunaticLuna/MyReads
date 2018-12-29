import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component{
	state = {
		query : '',
		books : [],
	}

	updateQuery = (newQuery) =>{
		this.setState(()=>({
			query : newQuery,
		}))
	}
	componentDidUpdate(prevProps,prevState){
		const currQuery = this.state.query
		const props = this.props
		if (currQuery !== prevState.query){
			if (currQuery === ''){
				this.setState(()=>({
		        books : [],
		      }))
			}else{
				BooksAPI.search(currQuery)
		    .then((value)=>{
		    	if (!value.error) {
		    		value.forEach(
			        	function(book){
			        		if (props.currentlyReading.filter((b)=> b.id === book.id).length!==0){
			        			console.log(prevProps.currentlyReading.filter((b)=> b.id === book.id))
			        			console.log("cr")
			        			book.shelf = "currentlyReading"
			        		}else{
			        			if (props.wantToRead.filter((b)=>b.id === book.id).length!==0){
			        				console.log("wtr")
			        				book.shelf = "wantToRead"
			        			}else{
			        				if (props.read.filter((b)=>b.id === book.id).length!==0){
			        					console.log("read")
			        					book.shelf = "read"
			        				}else{
			        					book.shelf = "none"
			        				}
			        			}
			        		}
			        })
			        console.log(value)
		    		this.setState(()=>({
			        books : value ,
			      }))
		    	}else{
		    		this.setState(()=>({
			        books : [],
			      }))
		    	}
		    })
		    .catch(()=>{
		      this.setState(()=>({
		        books : [],
		      }))
		    })
			}
			
		}
  }
	render(){
		return (
			<div className="search-books">
        <div className="search-books-bar">
        	{/*JSON.stringify(this.state)*/}
        	<Link to = '/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" 
            	placeholder = "Search by title or author"
            	value = {this.state.query}
            	onChange = {(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
	          {this.state.books.map((book)=>(
          			<li key = {book.id} >
          				{JSON.stringify(book.shelf)}
		          		<Book
		          			id = {book.id}
		          			imgLink = {book.imageLinks ? book.imageLinks.smallThumbnail : 'https://via.placeholder.com/128x193'}
		          			title = {book.title}
		          			authors = {book.authors}
		          			shelf = {book.shelf}
		          			onMoveShelf = {this.props.onMoveShelf} />
		          	</li>
          		))
          	}
          </ol>
        </div>
      </div>
		)
	}
}
export default Search