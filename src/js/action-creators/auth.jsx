'use strict';

import {provider} from '../auth';

import {
  AUTHENTICATED,
} from '../constants';

export const authenticated = user => ({ type: AUTHENTICATED, user });

// export const whoami = () =>
//   dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(user => dispatch(authenticated(user.data)))
//       .then(action => {
//         if (action.user) {
//           dispatch(fetchGoals(action.user.id));
//           dispatch(fetchMeals(action.user.id));
//           browserHistory.push('/meals');
//         }
//       })
//       .catch(failed => dispatch(authenticated(null)));

export const login = () =>
  dispatch =>
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const GAPI_Token = res.credential.accessToken;
        console.log(GAPI_Token);
        dispatch(authenticated(res.user));
      })
      .catch(err => console.err(err))

// export const logout = () =>
//   dispatch =>
//     axios.post('/api/auth/logout')
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()));
