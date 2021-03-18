import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
      setLoggedInUser(signedInUser);
      history.replace(from);
   
    }).catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const handleGoogleSignOut = () => {
    firebase.auth().signOut().then(() => {
      setLoggedInUser({});
    }).catch((error) => {
     
      console.log(error);
    });
  }

  const handleFbSignIN = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {

        const { displayName, photoURL } = result.user;
        const signedInUser = { name: displayName, photoURL }
        setLoggedInUser(signedInUser);
        history.replace(from);

      })
      .catch((error) => {

        const errorMessage = error.message;
        console.log(errorMessage);

      });
  }

  const handleFbSignOut = () => {
    firebase.auth().signOut().then(() => {
      setLoggedInUser({})
    }).catch((error) => {
      
      console.log(error);
    });
  }

  const handleGithubSignIn = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {

        const { displayName, photoURL } = result.user;
        const signedInUser = { name: displayName, photoURL }
        setLoggedInUser(signedInUser);
        history.replace(from);

      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleGithubSignOut = () => {
    firebase.auth().signOut().then(() => {
      setLoggedInUser({})
    }).catch((error) => {

      console.log(error);

    });
  }


  return (
    <div>
      <h1>This is Login</h1>
      <div>
        <button onClick={handleGoogleSignIn}>Google Sign in</button>
        <button onClick={handleGoogleSignOut}>Google SignOut</button>
      </div>
      <br />
      <div>
        <button onClick={handleFbSignIN}>Facebook Sign In</button>
        <button onClick={handleFbSignOut}>Facebook SignOut</button>
      </div>
      <br />
      <div>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        <button onClick={handleGithubSignOut}>Github Sign Out</button>
      </div>
    </div>
  );
};

export default Login;