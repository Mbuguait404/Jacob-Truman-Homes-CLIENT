import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Instagram, Facebook } from "lucide-react";
import { TikTokIcon } from "./SmallBits";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.696 15.51 2.035 12.165c.418-4.065 2.406-7.13 5.592-8.698.93-.442 1.93-.663 2.97-.663 1.052 0 1.977.196 2.746.58l-.017-.007c.142.073.27.153.386.24.228.174.455.393.67.653.147.225.26.475.331.742.018.208.028.42.028.636 0 2.03-.55 3.476-1.634 4.294-.6.443-1.357.71-2.15.766-.267 0-.526-.024-.776-.072-.388-.073-.75-.204-1.077-.387a2.26 2.26 0 01-.657-.699 2.18 2.18 0 01-.268-.578 2.45 2.45 0 01-.032-.43c0-.185.023-.363.066-.533.13-.37.352-.694.648-.95.228-.174.455-.393.67-.653.177-.03.357-.045.54-.045.16 0 .315.012.466.035.215.058.41.153.578.28.12.11.22.238.295.38.052.155.074.324.074.5 0 .176-.04.345-.113.5a1.26 1.26 0 01-.258.297 1.19 1.19 0 01-.34.177 1.17 1.17 0 01-.287.035 1.16 1.16 0 01-.29-.038 1.09 1.09 0 01-.31-.173 1.04 1.04 0 01-.19-.268.98.98 0 01-.052-.317c0-.114.023-.223.065-.324a.97.97 0 01.19-.237.94.94 0 01.266-.132.91.91 0 01.234-.03.9.9 0 01.234.033.87.87 0 01.24.14.83.83 0 01.153.21.78.78 0 01.04.24c0 .092-.018.18-.05.263a.75.75 0 01-.142.183.73.73 0 01-.2.103.71.71 0 01-.18.023.7.7 0 01-.18-.026.67.67 0 01-.19-.11.64.64 0 01-.117-.165.6.6 0 01-.03-.19c0-.07.013-.137.037-.2a.58.58 0 01.11-.138.56.56 0 01.156-.078.54.54 0 01.14.018.53.53 0 01.14.02.51.51 0 01.144.085.49.49 0 01.09.125.46.46 0 01.02.15c0 .05-.01.098-.026.143a.44.44 0 01-.083.104.42.42 0 01-.117.058.4.4 0 01-.103.013.39.39 0 01-.103-.015.37.37 0 01-.106-.06.35.35 0 01-.067-.1.33.33 0 01-.013-.116c0-.032.006-.063.017-.092a.31.31 0 01.062-.076.3.3 0 01.084-.04.28.28 0 01.072-.01.27.27 0 01.073.01.26.26 0 01.073.042.24.24 0 01.046.075.22.22 0 01.01.085c0 .017-.003.034-.008.05a.2.2 0 01-.04.05.19.19 0 01-.05.024.17.17 0 01-.044.006.16.16 0 01-.045-.007.15.15 0 01-.045-.025.13.13 0 01-.025-.044.11.11 0 01-.005-.045.1.1 0 01.006-.038.09.09 0 01.02-.024.08.08 0 01.022-.01.06.06 0 01.02 0 .05.05 0 01.02.003.04.04 0 01.013.01.02.02 0 01.005.015.01.01 0 010 .007z" />
  </svg>
);

export default function FloatingSocials() {
  const [expanded, setExpanded] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 561px)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 561px)");
    const onChange = (e) => setExpanded(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/jacobtrumanhomes/",
      icon: <Instagram />,
    },
    {
      label: "Threads",
      href: "https://www.threads.com/@jacobtrumanhomes",
      icon: <ThreadsIcon />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/JackTrumanProperties/",
      icon: <Facebook />,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@jacobtrumanhomes",
      icon: <TikTokIcon />,
    },
  ];

  const whatsappNumber = "254718806741";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=Hi%20Jacob%20Truman%20Properties,%20I%20would%20like%20to%20enquire%20about%20a%20property.`;

  return (
    <div className={`jth-floating-socials ${expanded ? "jth-floating-socials--expanded" : ""}`}>
      {expanded && (
        <div className="jth-floating-socials__stack">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="jth-floating-socials__btn"
              aria-label={s.label}
              title={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        className="jth-floating-socials__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Collapse socials" : "Expand socials"}
        title={expanded ? "Collapse" : "Expand"}
      >
        {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="jth-floating-socials__whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
