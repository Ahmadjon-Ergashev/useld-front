import "@/components/style/footer.css"
import { LogoContent } from "./icons"

export default function Footer() {
  return (
    <>
      {/* CTA */}
      <section className="cta" id="contact">
        <div className="cta-bg" />
        <div className="container cta-inner">
          <div className="cta-tag">Start Today — No Commitment Required</div>
          <h2 className="cta-title">
            Ready to Stay<br />
            <span className="gold">Compliant?</span>
          </h2>
          <p className="cta-sub">
            Join 1000+ drivers who trust US ELD for hassle-free FMCSA compliance. Start your free trial today.
          </p>
          <div className="cta-actions">
            <a href="mailto:info@useld.com" className="btn-gold" style={{ fontSize: '17px', padding: '15px 36px' }}>
              Start Free Trial
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="tel:+18001234567" className="btn-outline" style={{ fontSize: '17px', padding: '14px 35px' }}>
              Call Us Now
            </a>
          </div>
          <p className="cta-note">Plans from <span>$109/month</span> · No setup fees · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo" style={{ width: '150px', height: '80px' }}>
                <LogoContent />
              </div>
              <p>Professional ELD logbook service helping trucking companies stay FMCSA compliant. Trusted by 1000+ drivers across the United States.</p>
              <div className="footer-compliance">✓ FMCSA Compliant Platform</div>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {['ELD Compliance', 'DOT Audit Support', 'HOS Management', 'Driver Reports', 'Fleet Management', 'Technical Support'].map(s => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                {['About Us', 'Why Choose Us', 'Partners', 'FAQ', 'Pricing', 'Contact'].map(s => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:info@useld.com">info@useld.com</a></li>
                <li><a href="mailto:support@useld.com">support@useld.com</a></li>
                <li><a href="tel:+18001234567">+1 (800) 123-4567</a></li>
                <li><a href="#">24/7 Live Support</a></li>
                <li><a href="#">United States</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">© 2025 US ELD Logbook Service. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="/admin">Admin Panel</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
