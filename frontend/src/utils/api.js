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
        // const { data } = await axios.get('users/' + userId)
        // return data
    }

    //==================================
    //   REQUEST TO LOG IN TO ACCOUNT
    //==================================
    export async function loginToAccount(formData) {
        // const { data } = await axios.post('users/login', formData)
        // return data
    }

    //===================================
    //   REQUEST TO VIEW A SINGLE USER
    //===================================
    export async function getSingleUser(userId) {
        const { data } = await axios(
            {
                method: 'get',
                url:`https://major-bugtracker.herokuapp.com/users/view/${userId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //============================================
    //   REQUEST TO VIEW A SINGLE USER UNAUTHED
    //============================================
    export async function lookupNewUser(userId) {
        const { data } = await axios(
            {
                method: 'get',
                url:`https://major-bugtracker.herokuapp.com/users/lookup/${userId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //==============================================
    //   REQUEST TO GET LIST OF ALL SUPPORT USERS
    //==============================================
    export async function getAllSupport() {
        const { data } = await axios(
            {   
                method: 'get',
                url:`https://major-bugtracker.herokuapp.com/users/supportList`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //======================================
    //   REQUEST TO GET LIST OF ALL USERS
    //======================================
    export async function getAllUsers() {
        const { data } = await axios(
            {   
                method: 'get',
                url:`https://major-bugtracker.herokuapp.com/users/list`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }
    
    //============================
    //   REQUEST TO CREATE USER
    //============================
    export async function createUser(email) {
        // const { data } = await axios.post('users/request', email)
        // return data
    }

    //=============================
    //   REQUEST TO SIGN UP USER
    //=============================
    export async function signUpUser(userNumber, userData ) {
        const { data } = await axios(
            {
                data: userData,
                method: 'post',
                url:`https://major-bugtracker.herokuapp.com/users/create/${userNumber}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //============================
    //   REQUEST TO UPDATE USER
    //============================
    export async function updateUser(userData, userId) {
        const { data } = await axios(
            {   
                data: userData,
                method: 'put',
                url:`https://major-bugtracker.herokuapp.com/users/update/${userId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //============================
    //   REQUEST TO DELETE USER
    //============================
    export async function deleteUser(user_id) {
        const { data } = await axios(
            {   
                method: 'delete',
                url:`https://major-bugtracker.herokuapp.com/users/delete/${user_id}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //==============================================
    //   REQUEST TO SEND EMAIL TO UNVERIFIED USER
    //==============================================
    export async function sendEmail(id, email) {
        // const config = {
        //     headers: {
        //         'Authorization': localStorage.getItem('accessToken')
        //     }, 
        // }
        // const emailData= {
        //     email: email,
        //     base_url: `https://major-bugtracker.herokuapp.com/users/signup/${id}`
        // }
        // console.log(emailData)
        // const { data } = await axios.post(`users/invite`, emailData, config)
        // return data
    }

//============================
//   ISSUES DB API REQUESTS
//============================

    //====================================
    //   REQUEST TO VIEW A SINGLE ISSUE
    //====================================
    export async function getSingleIssue(issueId) {
        const { data } = await axios(
            {
                method: 'get',
                url:`https://major-bugtracker.herokuapp.com/issues/view/${issueId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            })
        return data
    }

    //===================================
    //   REQUEST FOR ISSUES BY USER ID
    //===================================
    export async function getUserIssues(userId) {
        const { data } = await axios(
            {   
                method: 'get',
                url:`https://major-bugtracker.herokuapp.com/issues/user/${userId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //===============================
    //   REQUEST TO GET ALL ISSUES
    //===============================
    export async function getAllIssues() {
        // const config = {
        //     headers: {
        //         'Authorization': localStorage.getItem('accessToken')
        //     }
        // }
        // const { data } = await axios.get('issues/list', config)
        // return data
    }

    //===============================
    //   REQUEST TO POST NEW ISSUE
    //===============================
    export async function createIssue(issueData) {
        // const config = {
        //     headers: {
        //         'Authorization': localStorage.getItem('accessToken')
        //     }
        // }
        // const { data } = await axios.post('issues/create', issueData, config)
        // return data
    }

    //=============================
    //   REQUEST TO DELETE ISSUE
    //=============================
    export async function deleteIssue(issueId) {
        const { data } = await axios(
            {   
                method: 'delete',
                url:`https://major-bugtracker.herokuapp.com/issues/delete/${issueId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }

    //=============================
    //   REQUEST TO UPDATE ISSUE
    //=============================
    export async function updateIssue(issueData, issueId) {
        const userType = await localStorage.getItem('userGroup')
        let route = 'issues/user/update/'
            if (userType == 1) {
                route = 'issues/support/update/'
            } else if (userType == 2) {
                route = 'issues/admin/update/'
            }
        const { data } = await axios(
            {   
                data: issueData,
                method: 'put',
                url:`https://major-bugtracker.herokuapp.com/${route}${issueId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }


//===============================
//   WORKITEMS DB API REQUESTS
//===============================

    //================================
    //   REQUEST TO CREATE WORKITEM
    //================================
    export async function createWorkItem(workItemData) {
        const { data } = await axios(
            {   
                data: workItemData,
                method: 'post',
                url:`https://major-bugtracker.herokuapp.com/workItems/create`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }


    //======================================
    //   REQUEST TO ADD WORKITEM TO ISSUE
    //======================================
    export async function addWorkItem(workItemId, issueId) {
        const { data } = await axios(
            {   
                data: workItemId,
                method: 'put',
                url:`https://major-bugtracker.herokuapp.com/issues/support/add/${issueId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }
    
    //================================
    //   REQUEST TO UPDATE WORKITEM
    //================================
    export async function updateWorkItem(workItemData, workItemId) {
        const { data } = await axios(
            {   
                data: workItemData,
                method: 'put',
                url:`https://major-bugtracker.herokuapp.com/workItems/update/${workItemId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }
    
    //================================
    //   REQUEST TO DELETE WORKITEM
    //================================
    export async function deleteWorkItem(workItemId) {
        const { data } = await axios(
            {   
                method: 'delete',
                url:`https://major-bugtracker.herokuapp.com/workItems/delete/${workItemId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }
    
    //===========================================
    //   REQUEST TO REMOVE WORKITEM FROM ISSUE
    //===========================================
    export async function removeWorkItem(workItemId, issueId) {
        const workItemInfo = {
            workItemId: workItemId
        }
        const { data } = await axios(
            {   
                data: workItemInfo,
                method: 'put',
                url:`https://major-bugtracker.herokuapp.com/issues/support/remove/${issueId}`,
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
        )
        return data
    }
