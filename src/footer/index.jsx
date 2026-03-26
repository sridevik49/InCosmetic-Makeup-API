import React from "react";
import "./index.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Top Section */}
      <div className="footer-top">
        <div className="email-box">
          <p>Get special discount on your inbox</p>
          <div className="email-input">
            <input type="email" placeholder="Your Email" />
            <button>SEND</button>
          </div>
        </div>

        <div className="app-download">
          <p>EXPERIENCE THE APP</p>
          <div className="store-buttons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="playstore" />
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="appstore" />
          </div>
        </div>

        <div className="support">
          <p>FOR ANY HELP, YOU MAY CALL US AT</p>
          <h4>1800-267-4444</h4>
          <span>(All days, 8 AM to 10 PM)</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-links">

        <div>
          <h4>Incosmetic</h4>
          <p>Who are we?</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Press</p>
          <p>Testimonials</p>
        </div>

        <div>
          <h4>Help</h4>
          <p>Contact Us</p>
          <p>FAQs</p>
          <p>Store Locator</p>
          <p>Cancellation & Return</p>
          <p>Shipping & Delivery</p>
        </div>

        <div>
          <h4>Inspire Me</h4>
          <p>Beauty Book</p>
          <p>Games Board</p>
          <p>Buying Guides</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p>Offer Zone</p>
          <p>New Launches</p>
          <p>Nykaa Man</p>
          <p>Nykaa Fashion</p>
          <p>Sitemap</p>
        </div>

        <div>
          <h4>Top Categories</h4>
          <p>Makeup</p>
          <p>Skin</p>
          <p>Hair</p>
          <p>Bath & Body</p>
          <p>Health & Wellness</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
