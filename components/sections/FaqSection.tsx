"use client";
import { useState } from "react";
import { SiteContent } from "@/lib/store";
import "@/components/style/faq.css";

export default function FaqSection({ content }: { content: SiteContent["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="faq" id="faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-left">
              <div className="stag">FAQ</div>
              <h2 className="faq-title">
                Got
                <br />
                <span className="gold">Questions?</span>
              </h2>
              <p className="faq-desc">
                Everything you need to know about our ELD logbook service. Can't find the answer? Contact us directly.
              </p>
              <div className="faq-contact-strip">
                <span className="faq-contact-label">Email us anytime</span>
                <span className="faq-contact-val">support@useld.com</span>
              </div>
            </div>

            <div className="faq-list">
              {content.map((item, i) => (
                <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
                  <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                    <span>{item.question}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-body">
                    <div className="faq-body-inner">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
