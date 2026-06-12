import React from "react";
import { Link } from "react-router-dom";

export default function PublicPageLayout({
  eyebrow,
  title,
  intro,
  updatedAt,
  sections,
  notice,
}) {
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "4rem 1rem",
      }}
    >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <span
          style={{
            color: "#047857",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "0.825rem",
            letterSpacing: "0.08em",
          }}
        >
          {eyebrow}
        </span>

        <div style={{ marginTop: "0.75rem", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#0f172a",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: "#475569",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "760px",
              marginTop: "1rem",
              marginBottom: 0,
            }}
          >
            {intro}
          </p>
        </div>

        {notice && (
          <div
            style={{
              backgroundColor: "#ecfdf5",
              border: "1px solid #a7f3d0",
              borderRadius: "10px",
              color: "#065f46",
              lineHeight: 1.7,
              marginBottom: "1.25rem",
              padding: "1rem 1.25rem",
            }}
          >
            {notice}
          </div>
        )}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #e2e8f0",
              padding: "1rem 1.25rem",
              color: "#64748b",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            {updatedAt}
          </div>

          <div style={{ display: "grid", gap: 0, padding: "0.75rem 0" }}>
            {sections.map((section) => (
              <section
                key={section.title}
                style={{
                  borderTop: "1px solid #f1f5f9",
                  padding: "1.6rem 1.25rem",
                }}
              >
                <h2
                  style={{
                    color: "#0f172a",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    marginTop: 0,
                    marginBottom: "0.65rem",
                  }}
                >
                  {section.title}
                </h2>
                {section.body && (
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "0.98rem",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {section.body}
                  </p>
                )}
                {section.items && (
                  <ul
                    style={{
                      color: "#475569",
                      display: "grid",
                      gap: "0.75rem",
                      lineHeight: 1.7,
                      margin: section.body ? "1rem 0 0" : 0,
                      paddingLeft: "1.2rem",
                    }}
                  >
                    {section.items.map((item) => (
                      <li key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "2rem",
          }}
        >
          <Link
            to="/contact"
            style={{
              backgroundColor: "#047857",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "0.8rem 1.15rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Contacter le support
          </Link>
          <Link
            to="/certificates/verify"
            style={{
              color: "#047857",
              fontWeight: 700,
              textDecoration: "none",
              padding: "0.8rem 0.25rem",
            }}
          >
            Vérifier un certificat
          </Link>
          <Link
            to="/"
            style={{
              color: "#047857",
              fontWeight: 700,
              textDecoration: "none",
              padding: "0.8rem 0.25rem",
            }}
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
