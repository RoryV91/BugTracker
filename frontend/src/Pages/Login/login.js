import {useState} from 'react'
import { loginToAccount } from '../../utils/api';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate(); 
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event, loginForm) => {
        event.preventDefault()
        loginToAccount(loginForm)
            .then((data) => {
                if (data.accessToken) {
                    localStorage.accessToken = data.accessToken;
                    localStorage.email = data.email;
                    localStorage.userId = data.userId;
                    setLoginForm({
                        email: '',
                        password: ''
                    })
                    navigate("/", {replace: true})
                } else {
                        window.alert("Login error! Email/password do not match!");
                }
            })
        
    }

    return (
        <>
            <h1>Log In page</h1>
            <p>This is a page</p>
            <div>
                <form>
                    <input 
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={loginForm.email}
                        placeholder="email"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={loginForm.password}
                        placeholder="Password"
                    />
                    <button 
                        onClick={(event) => handleSubmit(event, loginForm)}
                        type="submit"    
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}


export default Login