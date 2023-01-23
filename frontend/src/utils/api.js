import axios from 'axios';


//===============================
//   FOR TESTING PURPOSES ONLY
//===============================
//axios.defaults.baseURL = 'http://localhost:8000/';
//axios.defaults.baseURL = '';


//===========================
//   USERS DB API REQUESTS
//===========================

    //==============================
    //   REQUEST TO GET USER DATA
    //==============================
    export async function getUserData(userId) {
        const { data } = await axios.get('users/' + userId)
        return data
    }

    //==================================
    //   REQUEST TO LOG IN TO ACCOUNT
    //==================================
    export async function loginToAccount(formData) {
        const { data } = await axios.post('users/login', formData)
        return data
    }

    //===================================
    //   REQUEST TO VIEW A SINGLE USER
    //===================================
    export async function getSingleUser(userId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.get(`users/view/${userId}`, config)
        return data
    }

    //============================================
    //   REQUEST TO VIEW A SINGLE USER UNAUTHED
    //============================================
    export async function lookupNewUser(userId) {
        const { data } = await axios.get(`users/lookup/${userId}`)
        return data
    }

    //==============================================
    //   REQUEST TO GET LIST OF ALL SUPPORT USERS
    //==============================================
    export async function getAllSupport() {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.get('users/supportList', config)
        return data
    }

    //======================================
    //   REQUEST TO GET LIST OF ALL USERS
    //======================================
    export async function getAllUsers() {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.get('users/list', config)
        return data
    }
    
    //============================
    //   REQUEST TO CREATE USER
    //============================
    export async function createUser(email) {
        const { data } = await axios.post('users/request', email)
        return data
    }

    //=============================
    //   REQUEST TO SIGN UP USER
    //=============================
    export async function signUpUser(userNumber, userData ) {
        console.log("userData: " + JSON.stringify(userData))
        const { data } = await axios.post(`users/create/${userNumber}`, userData)
        return data
    }

    //============================
    //   REQUEST TO UPDATE USER
    //============================
    export async function updateUser(userData, userId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        } 
        const { data } = await axios.put(`users/update/${userId}`, userData, config)
        return data
    }

    //============================
    //   REQUEST TO DELETE USER
    //============================
    export async function deleteUser(user_id) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.delete(`users/delete/${user_id}`, config)
        return data
    }

    //==============================================
    //   REQUEST TO SEND EMAIL TO UNVERIFIED USER
    //==============================================
    export async function sendEmail(id, email) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }, 
        }
        const emailData= {
            email: email,
            base_url: `https://major-bugtracker.herokuapp.com/users/signup/${id}`
        }
        console.log(emailData)
        const { data } = await axios.post(`users/invite`, emailData, config)
        return data
    }

//============================
//   ISSUES DB API REQUESTS
//============================

    //====================================
    //   REQUEST TO VIEW A SINGLE ISSUE
    //====================================
    export async function getSingleIssue(issueId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios(
            {
                method: 'get',
                url:`https://major-bugtracker.herokuapp.com/issues/view/${issueId}`
            },
            config)
        console.log(JSON.stringify(data))
        return data
    }

    //===================================
    //   REQUEST FOR ISSUES BY USER ID
    //===================================
    export async function getUserIssues(userId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.get(`issues/user/${userId}`, config)
        return data
    }

    //===============================
    //   REQUEST TO GET ALL ISSUES
    //===============================
    export async function getAllIssues() {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.get('issues/list', config)
        return data
    }

    //===============================
    //   REQUEST TO POST NEW ISSUE
    //===============================
    export async function createIssue(issueData) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.post('issues/create', issueData, config)
        return data
    }

    //=============================
    //   REQUEST TO DELETE ISSUE
    //=============================
    export async function deleteIssue(issueId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.delete(`issues/delete/${issueId}`, config)
        return data
    }

    //=============================
    //   REQUEST TO UPDATE ISSUE
    //=============================
    export async function updateIssue(issueData, issueId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        } 
        const userType = await localStorage.getItem('userGroup')
        let route = 'issues/user/update/'
        if (userType == 1) {
            route = 'issues/support/update/'
        } else if (userType == 2) {
            route = 'issues/admin/update/'
        }
        const { data } = await axios.put(`${route}${issueId}`, issueData, config)
        return data
    }


//===============================
//   WORKITEMS DB API REQUESTS
//===============================

    //================================
    //   REQUEST TO CREATE WORKITEM
    //================================
    export async function createWorkItem(workItemData) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.post('workItems/create', workItemData, config)
        return data
    }

    //======================================
    //   REQUEST TO ADD WORKITEM TO ISSUE
    //======================================
    export async function addWorkItem(workItemId, issueId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.put(`issues/support/add/${issueId}`, workItemId, config)
        return data
    }
    
    //================================
    //   REQUEST TO UPDATE WORKITEM
    //================================
    export async function updateWorkItem(workItemData, workItemId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        } 
        const { data } = await axios.put(`workItems/update/${workItemId}`, workItemData, config)
        return data
    }
    
    //================================
    //   REQUEST TO DELETE WORKITEM
    //================================
    export async function deleteWorkItem(workItemId) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
        const { data } = await axios.delete(`workItems/delete/${workItemId}`, config)
        return data
    }
    
    //===========================================
    //   REQUEST TO REMOVE WORKITEM FROM ISSUE
    //===========================================
    export async function removeWorkItem(workItemId, issueId) {
        const workItemInfo = {
            workItemId: workItemId
        }
        const config = {
            headers: {
                'Authorization': localStorage.getItem('accessToken')
            }
        }
       const { data } = await axios.put(`issues/support/remove/${issueId}`, workItemInfo, config)
       return data
    }
