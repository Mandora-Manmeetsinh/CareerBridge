import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaSearch, FaArrowRight, FaSpinner } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'seeker' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const setRole = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Check if user exists
            const checkRes = await fetch(`http://localhost:3000/users?email=${formData.email}`);
            const existingUsers = await checkRes.json();

            if (existingUsers.length > 0) {
                setError('User with this email already exists');
                setLoading(false);
                return;
            }

            // Create new user
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newUser = await response.json();
                localStorage.setItem('user', JSON.stringify(newUser));
                navigate('/dashboard');
            } else {
                setError('Failed to create account');
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
                <img src="/assets/signup-bg.png" alt="Collaborative Workspace" />
                <div className="image-overlay">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                            Start Your Journey
                        </h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '500px' }}>
                            Connect with top employers and talented professionals. Build the future you've always imagined.
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
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join us to find your next opportunity.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <motion.input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    placeholder="John Doe"
                                    style={{ paddingLeft: '2.75rem' }}
                                    value={formData.name}
                                    onChange={handleChange}
                                    whileFocus={{ scale: 1.01, borderColor: 'var(--primary)' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <motion.input
                                    type="email"
                                    name="email"
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
                                    name="password"
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

                        <div className="input-group">
                            <label className="input-label">I am a...</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <motion.button
                                    type="button"
                                    className={`btn ${formData.role === 'seeker' ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ flex: 1 }}
                                    onClick={() => setRole('seeker')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaSearch style={{ marginRight: '0.5rem' }} /> Job Seeker
                                </motion.button>
                                <motion.button
                                    type="button"
                                    className={`btn ${formData.role === 'employer' ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ flex: 1 }}
                                    onClick={() => setRole('employer')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaBriefcase style={{ marginRight: '0.5rem' }} /> Employer
                                </motion.button>
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
                                <>Create Account <FaArrowRight style={{ marginLeft: '0.5rem' }} /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="auth-footer" style={{ marginTop: '2rem' }}>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" style={{ fontWeight: '600', color: 'var(--primary)' }}>Sign in</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
