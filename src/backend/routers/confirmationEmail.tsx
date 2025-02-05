export function ContactConfirmationEmail({
  name,
  date,
  time,
}: {
  name: string;
  date: string;
  time: string;
}) {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#F49FB7",
          padding: "24px",
          textAlign: "center",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFF"
          style={{ margin: "0 auto" }}
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: "32px",
          backgroundColor: "#FFF",
          color: "#1E1E1E",
          lineHeight: "1.5",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#2F2F2F",
          }}
        >
          Thank You, {name}!
        </h1>

        <p style={{ marginBottom: "24px" }}>
          We have received your contact details and are excited to connect with
          you. Your appointment has been confirmed:
        </p>

        <div
          style={{
            borderLeft: `4px solid #F49FB7`,
            paddingLeft: "16px",
            marginBottom: "32px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span
              style={{
                display: "inline-block",
                width: "60px",
                color: "#2F2F2F",
              }}
            >
              Date:
            </span>
            <strong style={{ color: "#1E1E1E" }}>{date}</strong>
          </div>
          <div>
            <span
              style={{
                display: "inline-block",
                width: "60px",
                color: "#2F2F2F",
              }}
            >
              Time:
            </span>
            <strong style={{ color: "#1E1E1E" }}>{time}</strong>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a
            href="#"
            style={{
              backgroundColor: "#F49FB7",
              color: "#FFF",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
          >
            Add to Calendar
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#2F2F2F",
          padding: "24px",
          textAlign: "center",
          color: "#FFF",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: "0 0 8px 0" }}>
          Need to reschedule? Reply to this email
        </p>
        <p style={{ margin: 0 }}>
          © 2024 Your Company Name, All rights reserved
        </p>
      </div>
    </div>
  );
}
