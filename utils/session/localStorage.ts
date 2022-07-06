
export interface Session {
    _id: string;
    name: string;
    email: string;
    createdAt: string | Date;
}

export const setSession = (sessionObject: Session) => {
    const jsonObject = JSON.stringify(sessionObject);
    localStorage.setItem('user', jsonObject);
}

export const deleteSession = () => {
    localStorage.removeItem('user');
}

export const getSession: any = () => {
    return localStorage.getItem('user');
}

export const getUser = () => {
    if(getSession()){
        return JSON.parse(getSession())
    }
    return null;
}

export const isAuthenticated = () => {
    if(getSession()){
        return true;
    }
    return false;
}