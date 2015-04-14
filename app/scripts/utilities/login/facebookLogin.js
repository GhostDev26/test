'use strict';

var Dispatcher = require('./../../dispatcher.js');
var UserProfile = require('./../../components/user-profile/user-profile.js');

var Router = window.ReactRouter,
	Route = Router.Route,
	Routes = Router.Routes,
	Link = Router.Link,
	RouteHandler = Router.RouteHandler;

var FacebookLogin = {

	login: function () {
		FB.login(function () {
			console.log("login");
			FacebookLogin.checkLoginState();
		});
	},

	checkLoginState: function () {
		console.log("checkLoginState");
		FB.getLoginStatus(function (response) {
			console.log("getLoginStatus");
			FacebookLogin.statusChangeCallback(response);
		});
	},

	statusChangeCallback: function (response) {
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			console.log("connected");
			FB.api('/me', function (response) {
				Dispatcher.setFacebookData(response);
				console.log("connected response : " + response);
				//route back to user-profile page

			});


		}
		else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			document.getElementById('status').innerHTML = 'Please log ' +
				'into this app.';
		}
		else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			document.getElementById('status').innerHTML = 'Please log ' +
				'into Facebook.';
		}
	},

	actions: {
		'facebook-login': 'login'
	}
};

module.exports = FacebookLogin;