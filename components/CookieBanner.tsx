'use client';

import CookieConsent from "react-cookie-consent";

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Zezwól na wszystkie"
      declineButtonText="Odmowa"
      cookieName="ucars-cookie-consent"
      style={{ background: "#0b1120", width: "100%" }}
      buttonStyle={{
        background: "#00a8e8",
        color: "#ffffff",
        fontSize: "14px",
        borderRadius: "6px",
      }}
      declineButtonStyle={{
        background: "#4b5563",
        color: "#ffffff",
        fontSize: "14px",
        borderRadius: "6px",
      }}
      expires={150}
      enableDeclineButton
      flipButtons
    >
      <h4 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        Ta strona korzysta z plików cookie
      </h4>
      <p style={{ fontSize: "0.875rem" }}>
        Używamy plików cookie, aby poprawić komfort przeglądania, wyświetlać
        spersonalizowane reklamy lub treści oraz analizować nasz ruch.
        Klikając „Zezwól na wszystkie”, wyrażasz zgodę na używanie przez nas
        plików cookie.
      </p>
    </CookieConsent>
  );
};

export default CookieBanner;
