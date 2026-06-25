import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = ({ language }) => {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tab, setTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin-login');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await fetch('/api/admin/dashboard');
      const statsData = await statsRes.json();
      setStats(statsData);

      const videosRes = await fetch('/api/videos/admin/pending');
      const videosData = await videosRes.json();
      setVideos(videosData);

      const paymentsRes = await fetch('/api/payments/history');
      const paymentsData = await paymentsRes.json();
      setPayments(paymentsData);
    } catch (err) {
      console.error('Error fetching data');
    }
  };

  const updateVideoStatus = async (videoId, status) => {
    try {
      await fetch(`/api/videos/${videoId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (err) {
      console.error('Error updating video');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>📊 {language === 'en' ? 'Admin Dashboard' : 'प्रशासक डॅशबोर्ड'}</h1>
        <button onClick={logout}>{language === 'en' ? 'Logout' : 'लॉगआउट'}</button>
      </div>

      <div className="admin-tabs">
        <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}
          >{language === 'en' ? 'Dashboard' : 'डॅशबोर्ड'}</button>
        <button className={tab === 'videos' ? 'active' : ''} onClick={() => setTab('videos')}
          >{language === 'en' ? 'Videos' : 'व्हिडिओ'}</button>
        <button className={tab === 'payments' ? 'active' : ''} onClick={() => setTab('payments')}
          >{language === 'en' ? 'Payments' : 'पेमेंट'}</button>
      </div>

      {tab === 'dashboard' && stats && (
        <div className="dashboard-stats">
          <div className="stat-card"><h3>₹{stats.totalRevenue}</h3><p>{language === 'en' ? 'Total Revenue' : 'एकूण महसूल'}</p></div>
          <div className="stat-card"><h3>{stats.totalUsers}</h3><p>{language === 'en' ? 'Users' : 'वापरकर्ता'}</p></div>
          <div className="stat-card"><h3>{stats.pendingVideos}</h3><p>{language === 'en' ? 'Pending Videos' : 'प्रलंबित व्हिडिओ'}</p></div>
          <div className="stat-card"><h3>{stats.activeSubscriptions}</h3><p>{language === 'en' ? 'Active Subs' : 'सक्रिय सदस्यता'}</p></div>
        </div>
      )}

      {tab === 'videos' && (
        <div className="videos-section">
          {videos.map((video) => (
            <div key={video._id} className="video-item">
              <h4>{video.title}</h4>
              <p>User: {video.userId?.name}</p>
              <p>Status: {video.status}</p>
              <button onClick={() => updateVideoStatus(video._id, 'completed')}>✓ {language === 'en' ? 'Approve' : 'मंजूर करा'}</button>
              <button onClick={() => updateVideoStatus(video._id, 'rejected')}>✗ {language === 'en' ? 'Reject' : 'नाकारा'}</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'payments' && (
        <div className="payments-section">
          <table>
            <thead>
              <tr>
                <th>{language === 'en' ? 'User' : 'वापरकर्ता'}</th>
                <th>{language === 'en' ? 'Amount' : 'रक्कम'}</th>
                <th>{language === 'en' ? 'Status' : 'स्थिति'}</th>
                <th>{language === 'en' ? 'Date' : 'तारीख'}</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.userId?.name}</td>
                  <td>₹{payment.amount}</td>
                  <td>{payment.status}</td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;