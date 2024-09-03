import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isFlipping, setIsFlipping] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = 'bg-light d-flex justify-content-center align-items-center vh-100';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setMessage('Please fill in all fields');
            return;
        }
        if (username.length < 3 || password.length < 6) {
            setMessage('Username must be at least 3 characters and password at least 6 characters long');
            return;
        }
        try {
            const res = await axios.get('https://style-world-omega.vercel.app/api/userlogin/', {
                params: {
                    email: username,
                    password: password
                }
            });
            console.log(res);
            setMessage(res.data.message);
            if (res.data.auth === true) {
                setTimeout(() => {
                    navigate('/Details');
                }, 1000);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed');
        }
    };

    const handleTogglePassword = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setShowPassword(!showPassword);
            setIsFlipping(false);
        }, 300);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm blur-card" style={{ maxWidth: '400px', width: '100vw' }}>
                <img src="/n logo.webp" alt="Logo" className="card-img-top rounded-circle mx-auto d-block mt-3" style={{ width: '80px', height: '80px' }} />
                <div className="card-body text-center">
                    <h2 className="h5 mb-3 text-warning">Welcome To Style World</h2>
                    <h1 className="h4 mb-4 text-warning">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                minLength={3}
                                maxLength={20}
                            />
                        </div>
                        <div className="form-group mb-3 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                minLength={6}
                            />
                            <span 
                                className={`position-absolute top-50 end-0 translate-middle-y me-3 ${isFlipping ? 'flip' : ''}`} 
                                onClick={handleTogglePassword}
                                style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#673C1F', transition: 'transform 0.6s ease' }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <button type="submit" className="btn btn-dark btn-block">
                            LOGIN
                        </button>
                    </form>
                    {message && <p className="text-danger mt-3">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
