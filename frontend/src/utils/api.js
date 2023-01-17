import axios from 'axios';

//For testing purposes
axios.defaults.baseURL = 'http://localhost:8000/';

// REQUEST FOR ISSUES BY USER ID
export async function getUserIssues(userId) {
    const { data } = await axios.get(`issues/user/${userId}`)
    return data
}

// REQUEST TO LOG IN TO ACCOUNT
export async function loginToAccount(formData) {
    const { data } = await axios.post('users/login', formData)
    return data
}

// REQUEST TO GET USER DATA
export async function getUserData(userId) {
    const { data } = await axios.get('users/' + userId)
    return data
}

// REQUEST TO GET ALL ISSUES
export async function getAllIssues() {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }
    const { data } = await axios.get('issues/list', config)
    return data
}

// REQUEST TO POST NEW ISSUE
export async function createIssue(issueData) {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }
    const { data } = await axios.post('issues/create', issueData, config)
    return data
}

// REQUEST TO DELETE ISSUE
export async function deleteIssue(issueId) {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }
    const { data } = await axios.delete(`issues/delete/${issueId}`, config)
    return data
}

// REQUEST TO UPDATE ISSUE
export async function updateReview(reviewData) {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }
    const { data } = await axios.put('reviews/update', reviewData, config)
    return data
}