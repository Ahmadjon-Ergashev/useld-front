import { SiteContent } from "@/lib/store";
import * as Icons from "lucide-react";
import "@/components/style/why-us.css";

const IconRenderer = ({ name }: { name: string }) => {
  const Icon = (Icons as any)[name];
  if (!Icon) return null;
  return <Icon size={28} style={{ color: "var(--gold)" }} />;
};

export default function WhyUsSection({ content }: { content: SiteContent["whyUs"] }) {
  return (
    <>
      <section className="why" id="why-us">
        <div className="container">
          <div className="why-header">
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
                Why Choose Us
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
            <h2 className="stitle" style={{ marginTop: "12px" }}>
              {content.title}
            </h2>
            <p className="why-sub">Everything you need to stay compliant and keep your fleet moving.</p>
          </div>

          <div className="why-grid">
            {content.items.map((item, i) => (
              <div className="why-card" key={i}>
                <span className="card-num">0{i + 1}</span>
                <div className="card-icon-wrap"><IconRenderer name={item.icon} /></div>
                <div className="card-title">{item.title}</div>
                <p className="card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
