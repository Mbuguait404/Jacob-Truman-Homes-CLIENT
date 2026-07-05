import React from "react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/common/SmallBits";

export default function NotFoundPage() {
  return (
    <div className="jth-notfound">
      <Eyebrow>404</Eyebrow>
      <h1>This address doesn't exist — yet.</h1>
      <p>The page you're looking for may have been moved or the listing may have sold.</p>
      <Link className="jth-btn jth-btn--primary" to="/">
        Back to home
      </Link>
    </div>
  );
}
