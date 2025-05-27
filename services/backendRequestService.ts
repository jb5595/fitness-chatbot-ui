import AuthService from './authService';

export default class BackendRequestService {
    static backendUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    static tokenRoute = 'token';
    static async fetch(path: string) {
        return fetch(BackendRequestService.url(path));
    }

    static url(path: string) {
        return `${BackendRequestService.backendUrl}/${path}`;
    }

    // Public wrapped around based authed fetch that will request token refreshes around request if necessary
    static async authedFetch(path: string, init?: RequestInit | undefined) {
        const token = AuthService.getAuth();
        if (!token && AuthService.getRefresh()) {
            return AuthService.refreshAuthToken().then(() =>
                BackendRequestService.baseAuthedFetch(path, init)
            );
        } else {
            return BackendRequestService.baseAuthedFetch(path, init).then(
                (response) => {
                    if (response?.status === 401) {
                        // try and refresh token if unauthorized response
                        return AuthService.refreshAuthToken().then(() =>
                            BackendRequestService.baseAuthedFetch(path, init).then(
                                (resp) => resp
                            )
                        );
                    }
                    return response;
                }
            );
        }
    }

    private static async baseAuthedFetch(path: string, init?: RequestInit | undefined) {
        const token = AuthService.getAuth();
        // deepcode ignore WrongNumberOfArguments: <snyk is incorrect, there are multiple overrides for this function>
        return fetch(BackendRequestService.url(path), {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${token}`
            },
        });
    }
}