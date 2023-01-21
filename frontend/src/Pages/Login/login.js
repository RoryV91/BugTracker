import {useState} from 'react'
import { loginToAccount } from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';



const Login = (props) => {

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
                    localStorage.refreshToken = data.refreshToken;
                    localStorage.email = data.email;
                    localStorage.userId = data.userId;
                    localStorage.userGroup = data.userGroup;
                    setLoginForm({
                        email: '',
                        password: ''
                    })
                    props.setUser(data);
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
                    <form className="column-33">
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
                            className="column" 
                            onClick={(event) => handleSubmit(event, loginForm)}
                            type="submit"    
                        >
                            Login
                        </button>
                        <h4>Dont have a login? Request access from your administrator. 🧑‍💻</h4>
                        <Link 
                            to="/requestAccess"
                            className="column column-offset-25"
                        >
                            <button>Request Access</button>
                            </Link>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Login