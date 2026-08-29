import React from "react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/common/SmallBits";
import Seo from "../components/common/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you're looking for doesn't exist. Explore verified properties with Jacob Truman Properties." path="/404" />
      <div className="jth-notfound">
      <Eyebrow>404</Eyebrow>
      <h1>This address doesn't exist — yet.</h1>
      <p>The page you're looking for may have been moved or the listing may have sold.</p>
      <Link className="jth-btn jth-btn--primary" to="/">
        Back to home
      </Link>
    </div>
    </>
  );
}
