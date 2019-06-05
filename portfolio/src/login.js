
import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class Login extends Component {
    constructor(props) {
        super(props);
        var firebaseConfig = {
            apiKey: "AIzaSyBRnx1GMc3w16goRHeC0q0BZejOL-VzezE    ",
            authDomain: "portfolio-7622f.firebaseapp.com",
            databaseURL: "https://portfolio-7622f.firebaseio.com",
            projectId: "portfolio-7622f",
            storageBucket: "portfolio-7622f",
            // messagingSenderId: "sender-id",
            // appID: "app-id",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.state = {
            form: {
                firstName: null,
                lastName: null,
                email: null,
                password: null
            },
            errorMessage: null
        };
        
    }
   
        
    socialLogin(providerName) {
        var provider;
        if (providerName === 'google') provider = new firebase.auth.GoogleAuthProvider();
        if (providerName === 'facebook') provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
    render() {
        let scope = this;
        var auth = firebase.auth();
        if (!scope.state.errorMessage) {
            auth.getRedirectResult().then(function () {
                // console.log(authData);
                return;
            }).catch(function (error) {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    var pendingCred = error.credential;
                    var email = error.email;
                    auth.fetchProvidersForEmail(email).then(function (methods) {
                        if (methods[0] === 'password') {
                            // var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                            // auth.signInWithEmailAndPassword(email, password).then(function(user) {
                            //     return user.link(pendingCred);
                            // }).then(function() {
                            // goToApp();
                            // });
                            return;
                        }
                        var provider;
                        if (methods[0] === 'google.com') provider = new firebase.auth.GoogleAuthProvider();
                        if (methods[0] === 'facebook.com') provider = new firebase.auth.FacebookAuthProvider();
                        alert('You already have an account but with a different provider @ ' + methods[0] + ', sign in with the old provider to link this provider.');
                        auth.signInWithPopup(provider).then(function (result) {
                            result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function () {
                                return;
                            });
                        });
                    });
                } else {
                    let json = scope.state;
                    json.errorMessage = error;
                    scope.setState(json);
                }
            });
        }
        
        // window.history.pushState({},'',window.location.href.replace('&leftnav=hidden',''));
       
       
        return (
            <div style={{ display: 'flex' }}>
                <div className='center-flex' style={{ width: '50%', flexDirection: 'column' }}>
                  
                    <div >
                        {/*<h5 className="py-3 mt-3" style={{margin: '0px'}}>using email</h5>*/}
                        <div className='center-flex mt-3'>
                            <button className="py-3 mr-3 border-0 blue-button rounded" style={{ justifyContent: 'center', width: '100%', cursor: 'pointer', fontWeight: '700', fontSize: '1.2em', whiteSpace: 'nowrap', background: '#dd4b39', color: 'white' }}
                                onClick={() => { scope.socialLogin('google'); }}>
                                GOOGLE
                            </button>
                            <button className="py-3 border-0 blue-button rounded" style={{ justifyContent: 'center', width: '100%', cursor: 'pointer', fontWeight: '700', fontSize: '1.2em', whiteSpace: 'nowrap', background: '#3b5998', color: 'white' }}
                                onClick={() => { scope.socialLogin('facebook'); }}>
                                FACEBOOK
                            </button>
                        </div>
          
                        
                        </div></div>
            </div>
        );
    }
}