// src/pages/ErrorPage.jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error occurred.</p>
      <p style={{ color: "red" }}>
        {error.statusText || error.message}
      </p>
    </div>
  );
}
