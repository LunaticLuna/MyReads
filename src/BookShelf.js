import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component{
	render(){
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.header}</h2>
				<div className="bookshelf-books">
          <ol className="books-grid">
          	{this.props.books.map((book)=>(
          			<li key = {book.id} >
          				{/*JSON.stringify(book)*/}
		          		<Book
		          			id = {book.id}
		          			imgLink = {book.imgLink?book.imgLink:book.imageLinks.smallThumbnail}
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
export default BookShelf