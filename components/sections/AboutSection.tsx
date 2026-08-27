import { SiteContent } from '@/lib/store'
import { Truck, CheckCircle, Star } from 'lucide-react'
import "@/components/style/about.css"

export default function AboutSection({ content }: { content: SiteContent['about'] }) {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            {/* Left: visual stats card */}
            <div className="about-visual">
              <div className="about-card">
                <div className="about-grid-lines" />
                <div className="about-stats-inner">
                  {content.stats.map((s, i) => (
                    <div key={i}>
                      {i > 0 && <div className="about-divider" style={{ marginBottom: '32px' }} />}
                      <div className="astat">
                        <div className="astat-icon">
                          {i === 0 ? <Truck size={28} /> : i === 1 ? <CheckCircle size={28} /> : <Star size={28} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div className="about-text">
              <div className="stag" style={{ justifyContent: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}>
                  About Us
                  <span
                    style={{
                      display: "block",
                      width: "28px",
                      height: "2px",
                      background: "var(--gold)",
                      borderRadius: "1px",
                    }}
                  />
                </span>
              </div>
              <h2 className="stitle" style={{ marginBottom: '32px' }}>
                Trusted ELD<br /><span className="gold">Compliance</span><br />Experts
              </h2>
              <div className="about-paras">
                {content.paragraphs.map((p, i) => (
                  <p className="about-para" key={i}>{p}</p>
                ))}
              </div>
              <div className="about-cta">
                <a href="#contact" className="btn-gold">Start Free Trial →</a>
                <a href="#faq" className="btn-outline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
