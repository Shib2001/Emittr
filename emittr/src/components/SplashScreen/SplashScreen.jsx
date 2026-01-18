/**
 * SplashScreen Component
 * Premium animated splash with particles, dynamic effects, and modern design
 */

import { useState, useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show text after logo animation
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 600);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    // Start fade out animation after 2.2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // Complete and unmount after fade animation
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 2700);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="splash-particle"
      style={{
        "--delay": `${Math.random() * 2}s`,
        "--x": `${Math.random() * 100}%`,
        "--y": `${Math.random() * 100}%`,
        "--size": `${4 + Math.random() * 8}px`,
        "--duration": `${3 + Math.random() * 4}s`,
      }}
    />
  ));

  // Generate orbit rings
  const orbitDots = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className="splash-orbit"
      style={{
        "--orbit-size": `${180 + i * 60}px`,
        "--orbit-duration": `${8 + i * 4}s`,
        "--orbit-delay": `${i * 0.5}s`,
      }}
    >
      <div className="splash-orbit-dot" />
    </div>
  ));

  return (
    <div
      className={`splash-screen ${fadeOut ? "splash-screen--fade-out" : ""}`}
    >
      {/* Animated Background */}
      <div className="splash-bg-gradient" />
      <div className="splash-bg-mesh" />

      {/* Floating Particles */}
      <div className="splash-particles">{particles}</div>

      {/* Main Content */}
      <div className="splash-content">
        {/* Orbiting Elements */}
        <div className="splash-orbit-container">{orbitDots}</div>

        {/* Logo with Glow Ring */}
        <div className="splash-logo-wrapper">
          <div className="splash-logo-ring" />
          <div className="splash-logo-ring splash-logo-ring--delayed" />
          <div className="splash-logo">
            <img
              src="/ChatGPT Image Jan 18, 2026, 06_53_32 PM.png"
              alt="EMITTR Logo"
            />
          </div>
        </div>

        {/* Brand Name with Letter Animation */}
        <div className={`splash-title-container ${showText ? "show" : ""}`}>
          <h1 className="splash-title">
            {"WorkFlowser".split("").map((letter, i) => (
              <span
                key={i}
                className="splash-letter"
                style={{ "--letter-delay": `${i * 0.05}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="splash-tagline">Design. Automate. Execute.</p>
        </div>

        {/* Modern Circular Progress */}
        <div className="splash-progress-container">
          <svg className="splash-progress-svg" viewBox="0 0 100 100">
            <circle className="splash-progress-bg" cx="50" cy="50" r="45" />
            <circle
              className="splash-progress-bar"
              cx="50"
              cy="50"
              r="45"
              style={{
                strokeDashoffset: `${283 - (283 * progress) / 100}`,
              }}
            />
          </svg>
          <span className="splash-progress-text">{progress}%</span>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="splash-corner splash-corner--tl" />
      <div className="splash-corner splash-corner--tr" />
      <div className="splash-corner splash-corner--bl" />
      <div className="splash-corner splash-corner--br" />
    </div>
  );
};

export default SplashScreen;
