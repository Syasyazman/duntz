// checks for user session
export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");

        return !!token;
    }
}

// removes access token and user details
export const clearUserSession = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    }

}