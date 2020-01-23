import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Grommet,
  Box,
  Grid,
  Text,
  Button,
  FormField,
  TextInput,
  Form,
  Anchor
} from 'grommet'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Box
      direction="column"
      justify="start"
      align="center"
      alignContent="start"
      pad="xsmall"
      gap="xsmall"
      round="small"
      margin="medium"
      basis="medium"
    >
      <Form onSubmit={handleSubmit} name={name}>
        <Box direction="column" align="center">
          <FormField htmlFor="email" label="Email" background="#FFFFFF">
            <TextInput name="email" type="text" background="#FFFFFF" />
          </FormField>
          <FormField htmlFor="password" label="Password">
            <TextInput name="password" type="password" />
          </FormField>
          {/* <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div> */}
          {/* <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div> */}
          {/* <div> */}
          <Button type="submit" label={displayName} color="#5FA782" />
          {/* </div> */}
          {error && error.response && <div> {error.response.data} </div>}
        </Box>
      </Form>
      <Anchor
        href="/auth/google"
        color="#5FA782"
        primary
        label={`${displayName} with Google`}
      />
    </Box>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
