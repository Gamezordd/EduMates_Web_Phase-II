import React from 'react';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import Firebase, { withFirebase } from '../Firebase';
import { RegisterState } from './types';
import { compose } from 'recompose';
import { Redirect, withRouter } from 'react-router-dom';

const INITIAL_STATE = {
  email: '',
  password: '',
  confirmedPassword: '',
  redirect: false,
  errors: [],
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

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

class RegisterForm extends React.Component<
  {
    firebase: Firebase;
  },
  RegisterState
> {
  constructor(props: any) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // Event listener for change in input fields.
  onChange = (e) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  checkUserInput = () => {
    const { email, password, confirmedPassword, errors } = this.state;

    if (email === '' || password === '') {
      errors.push('Email and password are required!');
    }

    if (password === '' || password.length < 6 || !/\d/.test(password)) {
      errors.push('Password are required!');
    }

    if (password !== confirmedPassword) {
      errors.push('Passwords are not matched!');
    }

    this.setState({ ...this.state, errors: errors });

    return errors.length === 0;
  };

  // Event listener for form submission.
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password, errors } = this.state;
    const { firebase } = this.props;

    if (!this.checkUserInput()) {
      errors.forEach((err) => notifyErrors(err));
      this.setState({ ...this.state, errors: [] });
      return;
    }

    // Call firebase function to sign the user in.
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return (
          authUser.user &&
          this.props.firebase.user(authUser.user.uid).set({
            email,
          })
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState(INITIAL_STATE);
        notifySuccess('Account signed up successfully!');
        this.setState({ ...this.state, redirect: true });
      })
      .catch((err) => {
        if (err.code === ERROR_CODE_ACCOUNT_EXISTS) {
          notifyErrors('Email already taken, please try a different email!');
        }
      });
  };

  render() {
    const { email, password, confirmedPassword, redirect } = this.state;

    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={this.onSubmit} autoComplete='off'>
            <h3 className='text-center text-brown mb-4'>Account Register</h3>
            <FormGroup>
              <Label for='signUpEmailField' className='form-label'>
                Email
              </Label>
              <Input
                type='email'
                name='email'
                id='signUpEmailField'
                value={email}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='signUpPasswordField' className='form-label'>
                Password
              </Label>
              <Input
                type='password'
                name='password'
                id='signUpPasswordField'
                value={password}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='signUpConfirmedPasswordField' className='form-label'>
                Confirm password
              </Label>
              <Input
                type='password'
                name='confirmedPassword'
                id='signUpConfirmedPasswordField'
                value={confirmedPassword}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <Input type='submit' value='Register' className='btn btn-danger' />
          </Form>
        </Col>
      </Row>
    );
  }
}

export default compose(withRouter, withFirebase)(RegisterForm);
