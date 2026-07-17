import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
          color: "#111827",
          padding: 60,
        }}
      >
                <img
          src="https://www.shovexa.com/logo.jpg"
          width={250}
          height={250}
          alt="Shovexa"
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f97316",
          }}
        >
          Shovexa
        </div>

        <div
          style={{
            fontSize: 34,
            marginTop: 24,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Shop electronics, fashion, home essentials, and more from trusted sellers.
        </div>
      </div>
    ),
    size
  );
}