import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = ({ language }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      setPackages(data);
    } catch (err) {
      console.error('Error fetching packages');
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>🎬 Cinematic 99</h1>
        <p>{language === 'en' ? 'Professional Video Editing Platform' : 'व्यावसायिक व्हिडिओ संपादन प्लेटफॉर्म'}</p>
        <a href="#packages" className="cta-btn">{language === 'en' ? 'Choose Package' : 'पॅकेज निवडा'}</a>
      </div>

      <div id="packages" className="packages-section">
        <h2>{language === 'en' ? 'Our Packages' : 'आमचे पॅकेज'}</h2>
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg._id} className="package-card">
              <h3>{language === 'en' ? pkg.name : pkg.nameMarathi}</h3>
              <h2>₹{pkg.price}</h2>
              <p>{language === 'en' ? pkg.duration : pkg.durationMarathi}</p>
              <ul>
                {(language === 'en' ? pkg.features : pkg.featuresMarathi || []).map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <button className="btn-select">{language === 'en' ? 'Select' : 'निवडा'}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="editing-gallery">
        <h2>{language === 'en' ? 'Our Work' : 'आमचे काम'}</h2>
        <p>{language === 'en' ? 'Follow us on Instagram: @cinematic._.99' : 'Instagram वर आमचे अनुसरण करा: @cinematic._.99'}</p>
        <div className="gallery-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="gallery-item">
              <div className="placeholder">🎥 Reel {i}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Cinematic 99 | Founder: Mr. Atharva Lamkane</p>
        <p>Instagram: @cinematic._.99</p>
      </footer>
    </div>
  );
};

export default Home;