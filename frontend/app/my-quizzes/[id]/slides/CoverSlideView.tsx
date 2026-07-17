"use client";

import { CoverSlide } from "@/app/lib/slide-builder";

export default function CoverSlideView({
  slide,
}: {
  slide: CoverSlide;
}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 56px",
        color: "#ffffff",
        background:
          "radial-gradient(circle at top, rgba(132,255,0,0.16), transparent 35%), linear-gradient(180deg, #11240a 0%, #081107 48%, #050505 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 30,
            textTransform: "uppercase",
            letterSpacing: "0.45em",
            color: "#d4d4d8",
          }}
        >
          QUIZARENA
        </div>

        <div
          style={{
            borderRadius: 9999,
            border: "1px solid rgba(132,255,0,0.3)",
            background: "rgba(132,255,0,0.1)",
            padding: "12px 24px",
            fontSize: 28,
            fontWeight: 700,
            color: "#b9ff6a",
          }}
        >
          {slide.category}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 820 }}>
          <p
            style={{
              fontSize: 34,
              textTransform: "uppercase",
              letterSpacing: "0.35em",
              color: "rgba(185,255,106,0.8)",
              margin: 0,
            }}
          >
            Premium Fußball Quiz
          </p>

          <h1
            style={{
              marginTop: 32,
              marginBottom: 0,
              fontSize: 118,
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              marginTop: 40,
              maxWidth: 760,
              fontSize: 40,
              lineHeight: 1.25,
              color: "#e4e4e7",
            }}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            borderRadius: 30,
            border: "1px solid #3f3f46",
            background: "rgba(0,0,0,0.25)",
            padding: "20px 32px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 28,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#a1a1aa",
            }}
          >
            Format
          </p>

          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              fontSize: 38,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            TikTok Quiz Slide
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              margin: 0,
              fontSize: 28,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#71717a",
            }}
          >
            Safe Zone
          </p>

          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              fontSize: 34,
              fontWeight: 600,
              color: "#d4d4d8",
            }}
          >
            Premium V1
          </p>
        </div>
      </div>
    </div>
  );
}