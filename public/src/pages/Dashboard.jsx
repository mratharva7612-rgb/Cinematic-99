import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ user, language }) => {
  const [subscription, setSubscription] = useState(null);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchSubscription();
    fetchVideos();
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`/api/packages/subscription/${user.id}`);
      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription');
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`/api/videos/user/${user.id}`);
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      console.error('Error fetching videos');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', file);
    formData.append('userId', user.id);
    formData.append('title', file.name);

    try {
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.video) {
        fetchVideos();
      }
    } catch (err) {
      console.error('Upload failed');
    }
    setUploading(false);
  };

  return (
    <div className="dashboard">
      <h2>{language === 'en' ? 'My Dashboard' : 'माझे डॅशबोर्ड'}</h2>
      
      {subscription && (
        <div className="subscription-card">
          <h3>{subscription.packageId?.name}</h3>
          <p>{language === 'en' ? 'Valid until: ' : 'वैध तोपर्यंत: '}{new Date(subscription.endDate).toLocaleDateString()}</p>
        </div>
      )}

      <div className="upload-section">
        <h3>{language === 'en' ? 'Upload Video' : 'व्हिडिओ अपलोड करा'}</h3>
        <input type="file" accept="video/*" onChange={handleUpload} disabled={uploading} />
        {uploading && <p>{language === 'en' ? 'Uploading...' : 'अपलोड होत आहे...'}</p>}
      </div>

      <div className="videos-list">
        <h3>{language === 'en' ? 'My Videos' : 'माझी व्हिडिओ'}</h3>
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <h4>{video.title}</h4>
            <p>Status: {video.status}</p>
            <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;