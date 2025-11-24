"use client";

/**
 * ContactMap Component
 * Note: Leaflet map is temporarily disabled due to react-leaflet v4 compatibility with React 19.
 * The map shows a static image placeholder. To re-enable:
 * 1. Check react-leaflet version compatibility
 * 2. Update MapContainer props to match the version's API
 */

export function ContactMap() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
      }}
    >
      <div style={{ textAlign: "center", color: "#666" }}>
        <p>📍 MAHDEE'S Restaurant</p>
        <p>233J+7C5, Sector 5-F, New Karachi Town, Karachi</p>
        <p style={{ fontSize: "12px", marginTop: "8px" }}>
          Map view disabled. See address above.
        </p>
      </div>
    </div>
  );
}
