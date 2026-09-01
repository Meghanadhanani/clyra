const BASEURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1/';

export const SIGNUP_API = BASEURL + 'auth/signup';
export const LOGIN_API = BASEURL + 'auth/login';
export const ME_API = BASEURL + 'auth/me';
export const LOGOUT_API = BASEURL + 'auth/logout';
export const REFRESH_API = BASEURL + 'auth/refresh';
export const WORKSPACE_CURRENT_API = BASEURL + 'workspaces/current';
