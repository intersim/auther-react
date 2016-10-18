// ACTION TYPE
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGIN_USER = 'LOGIN_USER';

// ACTION CREATOR
export const setCurrentUser = user => ({type: SET_CURRENT_USER, user});

export const loginUserAsync = authInfo => 
	dispatch => {
	fetch('/auth/login', {
		method: 'POST',
		body: JSON.stringify(authInfo)
	})
	.then(res => {
		if (res.ok) return res.json();	
		else throw new Error('User cannot be found');
		// else return res.text()
	})
	.then(user => {
		dispatch(setCurrentUser(user))
	})
	.catch(console.error);
};

export const signupUserAsync = authInfo => 
	dispatch => {
	fetch('/auth/signup', {
		method: 'POST',
		body: JSON.stringify(authInfo)
	})
	.then(res => {
		if (res.ok) return res.json();	
		else throw new Error('There was a problem signing you up.');
	})
	.then(([user]) => {
		dispatch(setCurrentUser(user))
	})
	.catch(console.error);
};

export const logoutUserAsync = () => 
	dispatch => {
	fetch('/auth/logout')
	.then(res => {
		if (res.ok) dispatch(setCurrentUser({}))	
		else throw new Error('There was a problem logging you out.');
	})
	.catch(console.error);
};

export const retrieveLoggedInUser = () => dispatch => {
  fetch('/auth/me')
  .then(res => {
  	if (res.ok) return res.json();
  	else throw new Error();
  })
  .then(user => dispatch(setCurrentUser(user)))
  .catch(err => console.error('retrieveLoggedInUser unsuccesful', err));
}

// REDUCER
export default (state = {}, action) => {
	switch (action.type) {
		case SET_CURRENT_USER: return action.user;
		default: return state;
	}
};