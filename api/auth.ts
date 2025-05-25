import BackendRequestService from "@/services/backendRequestService"

interface AuthUser {
    id: string;
    email: string;
    password: string;
    tokens: string[];
    isAdmin: boolean;
}

interface LoginTokens {
    authToken: string;
    refreshToken: string;
}

interface LoginResponse {
    user: AuthUser;
    tokens: LoginTokens;
}

export const postLogin = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(BackendRequestService.url("login"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    return await response.json() 
}

export const postSignUp = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(BackendRequestService.url("signup"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    return await response.json() 
}

export const getLogout = async () => {
    return await BackendRequestService.authedFetch("logout", {
        method: "GET",
    })
}

