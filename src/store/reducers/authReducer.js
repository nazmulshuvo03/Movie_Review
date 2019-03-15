const initState = {
	authError: null
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			console.log('Login Successful');
			return {
				...state,
				authError: null
			};

		case 'LOGIN_ERROR':
			console.log('Login Error');
			return {
				...state,
				authError: 'Login Failed'
			};

		default:
			return state;
	}
};

export default authReducer;
