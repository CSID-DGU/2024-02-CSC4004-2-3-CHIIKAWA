import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', { email, password });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <p style={styles.subtitle}>Enter your details for login</p>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label style={styles.icon}>👤</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.icon}>🔒</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.loginButton}>Login Now</button>
            </form>
            <button
                onClick={() => console.log('Forgot Password 클릭')}
                style={styles.forgotPassword}
            >
                Forgot password?
            </button>
            <p style={styles.footer}>
                Don't have an account? <span style={styles.signUp}>Sign Up</span>
            </p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '26px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '8px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '300px',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: '20px',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '16px',
        color: '#888',
    },
    input: {
        width: '83%',
        padding: '12px 12px 12px 36px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#F0F8FF',
        fontSize: '14px',
        color: '#333',
    },
    loginButton: {
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        backgroundColor: '#A0C4FF',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px',
    },
    forgotPassword: {
        fontSize: '14px',
        color: '#A0C4FF',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '30px',
        textDecoration: 'underline',
    },
    footer: {
        fontSize: '14px',
        color: '#666',
    },
    signUp: {
        color: '#A0C4FF',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default Login;
