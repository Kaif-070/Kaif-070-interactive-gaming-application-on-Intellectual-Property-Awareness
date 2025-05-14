import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} IP Awareness Game. All Rights Reserved.</p>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
