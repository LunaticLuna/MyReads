import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component{
	state = {
		shelf : this.props.shelf,
	}
	changeShelf = (value)=>{
		this.props.onMoveShelf(
			{ id : this.props.id,
				imgLink:this.props.imgLink,
				title:this.props.title,
				authors:this.props.authors,
				shelf:value,},value)
	}

	render(){
		return (
			<div className="book">
				<div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imgLink})` }}></div>
          <div className="book-shelf-changer">
          	<select value = {this.props.shelf} onChange = {(event) => (this.changeShelf(event.target.value))}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
				<div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
			</div>
		)
	}
}
export default Book