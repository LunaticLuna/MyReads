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
    current : [],
    want : [],
    read : [],
  }
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=>{
        current : books.filter((book)=>book.shelf==='current')
        want : books
        read : books
      })
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
                <div className="list-books-content">
                  <BookShelf 
                    header = {'Currently Reading'}
                    books = {this.state.current} />
                  <BookShelf 
                    header = {'Want to Read'}
                    books = {this.state.want} />
                  <BookShelf 
                    header = {'Read'}
                    books = {this.state.read} />
                </div>
              </div>
              <div className="open-search">
                <Link
                  to = '/search'
                  >
                </Link>
              </div>
            </div>)} />
        <Route path = '/search' component = {Search}/>
        
      </div>
    )
  }
}

export default BooksApp
