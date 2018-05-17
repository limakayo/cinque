import decode from 'jwt-decode';
import Auth0Lock from 'auth0-lock';
import history from './history'
import userStore from '../stores/UserStore';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const CLIENT_ID = 'oj7Mkm63IjyJgFtMiVs23NKVD5Hym0AM';
const CLIENT_DOMAIN = 'cinque.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'openid profile email';
const AUDIENCE = 'https://cinque.auth0.com/userinfo';

var options = {
  avatar: null,
  autoclose: true,
  closable: false,
  rememberLastLogin: true,
  allowAutocomplete: true,
  auth: {
    redirect: true,
    redirectUrl: REDIRECT,
    responseType: 'token id_token',
    audience: AUDIENCE,
    params: {
      scope: SCOPE
    }
  },
  language: 'pt-br',
  languageDictionary: {
    title: "CINQUE"
  },
  theme: {
    primaryColor: '#FF8A80',
    logo: 'https://instagram.fbfh3-1.fna.fbcdn.net/vp/79622f5b77fde47f8b791b12643ac199/5B78EE13/t51.2885-19/s150x150/26068240_867576406746647_2401388044226658304_n.jpg'
  }
}

var lock = new Auth0Lock(
  CLIENT_ID,
  CLIENT_DOMAIN,
  options
);

export function login() {
  lock.show()
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  userStore.removeProfile()
  // push history
  history.push('/')
  lock.show()
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn())
    replace({pathname: '/'})
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setUserInfo() {
  if (getAccessToken()) {
    lock.getUserInfo(getAccessToken(), (err, profile) => {
      userStore.setProfile(profile)
    })
  }
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  lock.getUserInfo(accessToken, (err, profile) => {
    localStorage.setItem("profile", profile);
  })

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

// Get and store profile in local localStorage
export function setProfile() {
  if (getAccessToken()) {
    lock.getUserInfo(getAccessToken(), (err, profile) => {
      localStorage.setItem("profile", profile);
    })
  }
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
