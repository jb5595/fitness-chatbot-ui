import React, { JSX } from 'react';
import BackendRequestService from '../services/backendRequestService';
import { User } from '../types/user';

export const CurrentUserContext = React.createContext<{
    currentUser: User | null;
    fetchCurrentUser: () => void;
    setCurrentUser: (user: User | null) => void;
}>({ currentUser: null, fetchCurrentUser: () => {}, setCurrentUser: () => {} });

export const CurrentUserProvider = ({
    children,
}: {
    children: string | JSX.Element | JSX.Element[];
}) => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);

    const fetchCurrentUser = async () => {
        BackendRequestService.authedFetch('users/me')
            .then((resp) => resp?.json())
            .then((data) => {
                setCurrentUser(data as User);
            });
    };

    return (
        <CurrentUserContext.Provider
            value={{ currentUser, fetchCurrentUser, setCurrentUser }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);