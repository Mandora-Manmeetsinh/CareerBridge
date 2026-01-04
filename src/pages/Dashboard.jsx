import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome, FaBriefcase, FaUser, FaCog, FaSignOutAlt,
    FaBell, FaSearch, FaChartLine, FaUsers, FaSave, FaCamera
} from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Profile Form State
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        title: 'Software Engineer',
        bio: 'Passionate developer with 5+ years of experience in building scalable web applications.',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567'
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setProfileData(prev => ({ ...prev, name: parsedUser.name, email: parsedUser.email }));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const updatedUser = { ...user, ...profileData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setLoading(false);
            setSuccessMsg('Profile updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        }, 1000);
    };

    if (!user) return null;

    const sidebarItems = [
        { id: 'overview', icon: FaHome, label: 'Overview' },
        { id: 'jobs', icon: FaBriefcase, label: 'My Jobs' },
        { id: 'profile', icon: FaUser, label: 'Profile' },
        { id: 'settings', icon: FaCog, label: 'Settings' },
    ];

    const chartData = [
        { name: 'Mon', views: 40 },
        { name: 'Tue', views: 30 },
        { name: 'Wed', views: 60 },
        { name: 'Thu', views: 45 },
        { name: 'Fri', views: 80 },
        { name: 'Sat', views: 55 },
        { name: 'Sun', views: 70 },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--background)', overflow: 'hidden' }}>
            {/* Sidebar */}
            <div style={{
                width: '260px',
                background: 'var(--surface)',
                borderRight: '1px solid var(--border)',
                padding: '1.5rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10
            }}>
                <div style={{ marginBottom: '2.5rem', paddingLeft: '1rem' }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <FaBriefcase /> JobPortal
                    </h2>
                </div>

                <nav style={{ flex: 1 }}>
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '0.75rem 1rem',
                                marginBottom: '0.25rem',
                                borderRadius: '0.5rem',
                                background: activeTab === item.id ? '#eff6ff' : 'transparent',
                                color: activeTab === item.id ? 'var(--primary)' : 'var(--text-muted)',
                                border: 'none',
                                textAlign: 'left',
                                fontSize: '0.95rem',
                                fontWeight: activeTab === item.id ? '600' : '500',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            <item.icon style={{ marginRight: '0.75rem', fontSize: '1.1rem' }} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            border: 'none',
                            textAlign: 'left',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}
                    >
                        <FaSignOutAlt style={{ marginRight: '0.75rem', fontSize: '1.1rem' }} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <header style={{
                    padding: '1.5rem 2rem',
                    background: 'white',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button style={{
                            background: 'white',
                            border: '1px solid var(--border)',
                            padding: '0.6rem',
                            borderRadius: '0.5rem',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <FaBell />
                        </button>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: '#f8fafc' }}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Stats Grid */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '2rem'
                                }}>
                                    {[
                                        { label: 'Total Applications', value: '12', icon: FaBriefcase, color: 'var(--primary)' },
                                        { label: 'Interviews Scheduled', value: '3', icon: FaUsers, color: '#10b981' },
                                        { label: 'Profile Views', value: '284', icon: FaChartLine, color: '#f59e0b' },
                                    ].map((stat, index) => (
                                        <div key={index} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                            <div style={{ padding: '0.875rem', borderRadius: '0.5rem', background: `${stat.color}15`, color: stat.color, fontSize: '1.25rem' }}>
                                                <stat.icon />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', lineHeight: '1.2', color: 'var(--text)' }}>{stat.value}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>{stat.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart Section */}
                                <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)', marginBottom: '1.5rem' }}>Profile Views Analytics</h3>
                                    <div style={{ height: '300px', width: '100%' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Area type="monotone" dataKey="views" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                style={{ maxWidth: '800px', margin: '0 auto' }}
                            >
                                <div className="card" style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                background: 'var(--primary)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '2.5rem',
                                                fontWeight: '600'
                                            }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <button style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                right: '0',
                                                background: 'white',
                                                border: '1px solid var(--border)',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--text-muted)',
                                                cursor: 'pointer',
                                                boxShadow: 'var(--shadow-sm)'
                                            }}>
                                                <FaCamera size={14} />
                                            </button>
                                        </div>
                                        <div>
                                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>{user.name}</h2>
                                            <p style={{ color: 'var(--text-muted)' }}>{profileData.title}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleProfileUpdate}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div className="input-group">
                                                <label className="input-label">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="input-field"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Email Address</label>
                                                <input
                                                    type="email"
                                                    className="input-field"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    disabled
                                                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div className="input-group">
                                                <label className="input-label">Job Title</label>
                                                <input
                                                    type="text"
                                                    className="input-field"
                                                    value={profileData.title}
                                                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Location</label>
                                                <input
                                                    type="text"
                                                    className="input-field"
                                                    value={profileData.location}
                                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <label className="input-label">Bio</label>
                                            <textarea
                                                className="input-field"
                                                rows="4"
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                style={{ resize: 'vertical' }}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
                                            {successMsg && <span style={{ color: '#10b981', fontSize: '0.9rem' }}>{successMsg}</span>}
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={loading}
                                            >
                                                <FaSave style={{ marginRight: '0.5rem' }} />
                                                {loading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'jobs' && (
                            <motion.div
                                key="jobs"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="card" style={{ padding: '0' }}>
                                    {[
                                        { role: 'Senior Frontend Developer', company: 'TechCorp Inc.', status: 'In Review', date: '2 days ago', logo: 'TC' },
                                        { role: 'Product Designer', company: 'Creative Studio', status: 'Interview', date: '5 days ago', logo: 'CS' },
                                        { role: 'Full Stack Engineer', company: 'StartUp Co.', status: 'Applied', date: '1 week ago', logo: 'SC' },
                                    ].map((job, i) => (
                                        <div key={i} style={{
                                            padding: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderBottom: i < 2 ? '1px solid var(--border)' : 'none'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '0.5rem',
                                                    background: '#f1f5f9',
                                                    color: 'var(--text-muted)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: '600'
                                                }}>
                                                    {job.logo}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text)' }}>{job.role}</h3>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{job.company} • Applied {job.date}</p>
                                                </div>
                                            </div>
                                            <span style={{
                                                padding: '0.35rem 0.85rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                background: job.status === 'Interview' ? '#ecfdf5' : '#eff6ff',
                                                color: job.status === 'Interview' ? '#059669' : 'var(--primary)',
                                                border: `1px solid ${job.status === 'Interview' ? '#d1fae5' : '#dbeafe'}`
                                            }}>
                                                {job.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
