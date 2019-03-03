import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const SIGNUP_MUTATION = gql`
	mutation SignupMutation(
		$email: String!
		$password: String!
		$name: String!
	) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			login: true,
			email: '',
			password: '',
			name: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	}

	_confirm = async data => {
		const { token } = this.state.login ? data.login : data.signup
		this._saveUserData(token)
		this.props.history.push(`/`)
	}

	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token)
	}

	render() {
		const { login, email, password, name } = this.state
		return (
			<div>
				<h4 className='mv3'>{login ? 'Login:' : 'Sign Up:'}</h4>
				<div className='flex flex-column'>
					{!login && (
						<input
							name='name'
							value={name}
							onChange={this.handleInputChange}
							type='text'
							placeholder='Your Name'
						/>
					)}
					<input
						name='email'
						value={email}
						onChange={this.handleInputChange}
						type='email'
						placeholder='Your Email'
					/>
					<input
						name='password'
						value={password}
						onChange={this.handleInputChange}
						type='password'
						placeholder='Password'
					/>
				</div>
				<div className='flex mt3'>
					<Mutation
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
						variables={{
							email,
							password,
							name
						}}
						onCompleted={data => this._confirm(data)}
					>
						{mutation => (
							<div
								className='pointer mr2 button'
								onClick={mutation}
							>
								{login ? 'login' : 'create account'}
							</div>
						)}
					</Mutation>
					<div
						className='pointer button'
						onClick={() =>
							this.setState({
								login: !login
							})
						}
					>
						{login
							? 'Need to Create an Account?'
							: 'Already Have an Account?'}
					</div>
				</div>
			</div>
		)
	}
}
