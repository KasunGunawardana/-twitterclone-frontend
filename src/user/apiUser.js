export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then( response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
}

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET"
    }).then( response => {
        return response.json();
    })
}

export const deleteUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then( response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
}

export const updateUser = (userId, token, userData) => {
    console.log(userData);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: userData
    }).then( response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
}

export const updatedUser = (user, next) => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth))
            next();
        }
    }
}

export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    }).then( response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
};

export const unFollow = (userId, token, unFollowId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({userId, unFollowId})
    }).then( response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
};