export const configAPI = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}