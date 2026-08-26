import React, { useState, useRef, useEffect } from "react";
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { WhatsAppIcon } from "./SmallBits";

const NETWORKS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    icon: <WhatsAppIcon size={20} />,
    href: (url, text) => `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    color: "#1877F2",
    icon: <Facebook size={20} />,
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: "twitter",
    label: "X",
    color: "#0f0f0f",
    icon: <Twitter size={20} />,
    href: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    color: "#0A66C2",
    icon: <Linkedin size={20} />,
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export default function ShareButton({ url, title = "", text = "", iconOnly = false, className = "" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || title || "";
  const canNative = typeof navigator !== "undefined" && !!navigator.share;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: shareText, text: shareText, url: shareUrl });
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className={`jth-share ${className}`} ref={ref}>
      <button
        type="button"
        className={`jth-share__btn ${iconOnly ? "jth-share__btn--icon" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Share this listing"
        aria-expanded={open}
        title="Share"
      >
        <Share2 size={16} /> {!iconOnly && "Share"}
      </button>
      {open && (
        <div className="jth-share__menu" role="menu">
          <div className="jth-share__header">
            <span>Share this listing</span>
            {canNative && (
              <button type="button" className="jth-share__more" onClick={handleNative} aria-label="More share options" title="More options">
                <Share2 size={14} />
              </button>
            )}
          </div>

          <div className="jth-share__grid">
            {NETWORKS.map((n) => (
              <a
                key={n.key}
                className="jth-share__net"
                href={n.href(shareUrl, shareText)}
                target="_blank"
                rel="noopener noreferrer"
                title={`Share on ${n.label}`}
              >
                <span className="jth-share__net-btn" style={{ background: n.color }}>
                  {n.icon}
                </span>
                <span className="jth-share__net-label">{n.label}</span>
              </a>
            ))}
          </div>

          <button type="button" className="jth-share__copy" onClick={handleCopy}>
            <LinkIcon size={15} />
            <span className="jth-share__copy-url">{shareUrl}</span>
            <span className="jth-share__copy-action">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
