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
                    localStorage.userGroup = data.userGroup;
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
            <div className="container">
                <h3>Log In to your account</h3>
                <div className="row">
                    
                    <form className="column-33 column-offset-25">
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
            </div>
        </>
    )
}


export default Login