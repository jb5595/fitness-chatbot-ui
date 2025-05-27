import BackendRequestService from './backendRequestService';

export default class AuthService {
    private static authTokenKey = 'auth';

    private static refreshTokenKey = 'refresh';

    static setAuth(token: string) {
        sessionStorage?.setItem(AuthService.authTokenKey, token);
    }
    static setRefresh(token: string) {
        localStorage?.setItem(AuthService.refreshTokenKey, token);
    }

    static getAuth() {
        return sessionStorage?.getItem(AuthService.authTokenKey);
    }

    static getRefresh() {
        return localStorage.getItem(AuthService.refreshTokenKey);
    }

    static removeAuth() {
        sessionStorage?.removeItem(AuthService.authTokenKey);
    }

    static removeRefresh() {
        localStorage?.removeItem(AuthService.refreshTokenKey);
    }

    static async logout() {
        await BackendRequestService.authedFetch('logout');
        AuthService.removeAuth();
        AuthService.removeRefresh();
    }

    static async refreshAuthToken() {
        const refreshToken = AuthService.getRefresh();
        return fetch(
            BackendRequestService.url(BackendRequestService.tokenRoute),
            {
                method: 'POST',
                body: JSON.stringify({ token: refreshToken }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => {
            return response
                .json()
                .then((data) => {
                    AuthService.setAuth(data.tokens.authToken);
                    AuthService.setRefresh(data.tokens.refreshToken);
                    data;
                })
                .catch((e) => {
                    console.error(e);
                    AuthService.removeAuth();
                    AuthService.removeRefresh();
                });
        });
    }
}