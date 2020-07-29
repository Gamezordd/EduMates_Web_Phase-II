import React from 'react';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import Firebase, { withFirebase } from '../Firebase';
import { LoginState } from './types';
import { compose } from 'recompose';
import { Redirect, withRouter } from 'react-router-dom';

const INITIAL_STATE = {
  email: '',
  password: '',
  redirect: false,
};

const notifySuccess = (success: string) => {
  toast(success, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
  });
};

const notifyErrors = (error: string) => {
  toast(error, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.ERROR,
    autoClose: 10000,
  });
};

class LoginForm extends React.Component<
  {
    firebase: Firebase;
  },
  LoginState
> {
  constructor(props: any) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // Event listener for change in input fields.
  onChange = (e: React.FormEvent<HTMLInputElement>) =>
    this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  // Event listener for form submission.
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { firebase } = this.props;

    // Check for valid input submission.
    if (email === '' || password === '') {
      notifyErrors('Email, and password are required!');
      return;
    }

    // Call firebase function to sign the user in.
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(INITIAL_STATE);
        notifySuccess('Account signed in successfully!');
        this.setState({ ...this.state, redirect: true });
      })
      .catch((_err) => {
        notifyErrors('Invalid credentials, please try again!');
      });
  };

  render() {
    const { email, password, redirect } = this.state;

    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={this.onSubmit} autoComplete='off'>
            <h3 className='text-center text-brown mb-4'>Account Login</h3>
            <FormGroup>
              <Label for='signInEmailField' className='form-label'>
                Email
              </Label>
              <Input
                type='email'
                name='email'
                id='signInEmailField'
                value={email}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='signInPasswordField' className='form-label'>
                Password
              </Label>
              <Input
                type='password'
                name='password'
                id='signInPasswordField'
                value={password}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <Input type='submit' value='Login' className='btn btn-danger' />
          </Form>
        </Col>
      </Row>
    );
  }
}

export default compose(withRouter, withFirebase)(LoginForm);
