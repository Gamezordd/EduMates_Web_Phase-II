import React from 'react';

export const FirebaseContext = React.createContext<any | null>(null);

export const withFirebase = (Component: typeof React.Component) => (
  props: any
) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
