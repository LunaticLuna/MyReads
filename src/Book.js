import React, { Component } from 'react'

class Book extends Component{
	render(){
		return (
			<div className="book">
				<div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
			</div>
		)
	}
}
export default Book