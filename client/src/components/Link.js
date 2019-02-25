import React, { Component } from 'react'

class Link extends Component {

	render() {
		return (
			<div className='linkComponent'>
				{this.props.link.description} ({this.props.link.url})
			</div>
		)
	}
}

export default Link