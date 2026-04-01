import { SiteContent } from "@/lib/store";
import "@/components/style/partners.css";

export default function PartnersSection({ content }: { content: SiteContent["partners"] }) {
  const doubled = [...content, ...content];
  return (
    <>
      <section className="partners" id="partners">
        <div className="partners-header container">
          <div
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
              marginBottom: "14px",
            }}>
            <span
              style={{ display: "block", width: "28px", height: "2px", background: "var(--gold)", borderRadius: "1px" }}
            />
            Our Partners
            <span
              style={{ display: "block", width: "28px", height: "2px", background: "var(--gold)", borderRadius: "1px" }}
            />
          </div>
          <div className="partners-title">Trusted Industry Partners</div>
          <p className="partners-sub">Working with the best in the trucking and logistics industry</p>
        </div>

        <div className="marquee-outer">
          <div className="marquee-track">
            {doubled.map((p, i) => (
              <div className="partner-item" key={i}>
                {p.logo ? (
                  <img src={p.logo} alt={p.name} title={p.name} style={{ maxWidth: '100%', maxHeight: '60px', opacity: 0.6, filter: 'grayscale(100%)', transition: 'all 0.3s' }} />
                ) : (
                  <span className="partner-name">{p.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="partners-note container">
          Interested in partnering with us? <a href="mailto:partners@useld.com">Get in touch →</a>
        </div>
      </section>
    </>
  );
}
