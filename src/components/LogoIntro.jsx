import { useEffect, useRef, useState } from "react";

export default function LogoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  // Lock scroll during intro
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleEnded = () => {
    setFadeOut(true);
    setTimeout(() => onComplete?.(), 900);
  };

  // Fallback: skip after 10s if video fails
  useEffect(() => {
    const fallback = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete?.(), 900);
    }, 10000);
    return () => clearTimeout(fallback);
  }, [onComplete]);

  // Try to play on mount (handles autoplay policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — skip intro immediately
        setFadeOut(true);
        setTimeout(() => onComplete?.(), 900);
      });
    }
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.9s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <video
        ref={videoRef}
        src="/leona-animation.mp4"
        muted
        playsInline
        onEnded={handleEnded}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}