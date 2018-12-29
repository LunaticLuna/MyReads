import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : [],
  }
  moveShelf = (b,shelf) =>{
    BooksAPI.update({id:b.id},shelf)
      .then((value)=>{
        console.log('yayyy')
    })
    if (shelf === 'none'){
      this.setState((currentState) => ({
        books : currentState.books.filter((book)=> (book.id !== b.id) ),
      }))
    }else{
      this.setState((currentState) => ({
        books : currentState.books.filter((book)=> (book.id !== b.id) ).concat([b])
      }))
    }
  }

    
  
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=>({
        books : books,
      }))
    })
  }
  render() {

    return (
      <div className = "app">

        <Route exact path = '/' render = {()=>(
            <div>
              <div className = "list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {/*JSON.stringify(this.state.read) */}
                <div className="list-books-content">
                  <BookShelf 
                    header = {'Currently Reading'}
                    books = {this.state.books.filter((book)=>book.shelf==='currentlyReading')}
                    onMoveShelf = {(book,shelf)=>this.moveShelf(book,shelf)} />
                  <BookShelf 
                    header = {'Want to Read'}
                    books = {this.state.books.filter((book)=>book.shelf==='wantToRead')}
                    onMoveShelf = {(book,shelf)=>this.moveShelf(book,shelf)} />
                  <BookShelf 
                    header = {'Read'}
                    books = {this.state.books.filter((book)=>book.shelf==='read')}
                    onMoveShelf = {(book,shelf)=>this.moveShelf(book,shelf)} />
                </div>
              </div>
              <div className="open-search">
                <Link to = '/search'>search</Link>
              </div>
            </div>)} />
        <Route path = '/search' render = {()=>(
            <Search 
              onMoveShelf = {(book,shelf)=>this.moveShelf(book,shelf)}
              currentlyReading = {this.state.books.filter((book)=>book.shelf==='currentlyReading')}
              wantToRead = {this.state.books.filter((book)=>book.shelf==='wantToRead')}
              read = {this.state.books.filter((book)=>book.shelf==='read')} />
          )} />
        
      </div>
    )
  }
}

export default BooksApp
