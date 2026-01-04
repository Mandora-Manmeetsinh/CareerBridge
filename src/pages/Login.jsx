import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaArrowRight, FaSpinner } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.type]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/users?email=${formData.email}&password=${formData.password}`);
            const users = await response.json();

            if (users.length > 0) {
                localStorage.setItem('user', JSON.stringify(users[0]));
                navigate('/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="split-screen-container">
            {/* Image Side */}
            <motion.div
                className="image-side"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <img src="/assets/login-bg.png" alt="Office Workspace" />
                <div className="image-overlay">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                            Elevate Your Career
                        </h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '500px' }}>
                            Join thousands of professionals finding their dream jobs every day. Your next big opportunity is just a click away.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Form Side */}
            <div className="form-side">
                <motion.div
                    className="auth-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <motion.input
                                    type="email"
                                    className="input-field"
                                    placeholder="you@company.com"
                                    style={{ paddingLeft: '2.75rem' }}
                                    value={formData.email}
                                    onChange={handleChange}
                                    whileFocus={{ scale: 1.01, borderColor: 'var(--primary)' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <motion.input
                                    type="password"
                                    className="input-field"
                                    placeholder="••••••••"
                                    style={{ paddingLeft: '2.75rem' }}
                                    value={formData.password}
                                    onChange={handleChange}
                                    whileFocus={{ scale: 1.01, borderColor: 'var(--primary)' }}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', background: '#fee2e2', padding: '0.5rem', borderRadius: '0.5rem' }}
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem' }}
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : (
                                <>Sign In <FaArrowRight style={{ marginLeft: '0.5rem' }} /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="auth-footer" style={{ marginTop: '2rem' }}>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ fontWeight: '600', color: 'var(--primary)' }}>Create an account</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
