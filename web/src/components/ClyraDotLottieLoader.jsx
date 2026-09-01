"use client";

import { useEffect, useState } from "react";

export default function ClyraDotLottieLoader({
  src = "/clyra-loader.json",
  message = "Brewing digital espresso & warming up the AI... ☕",
}) {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // Dynamically import @dotlottie/player-component on client
    import("@dotlottie/player-component")
      .then(() => setPlayerReady(true))
      .catch((err) => console.error("Failed to load dotlottie-player:", err));
  }, []);

  return (
    <div
      id="loader-wrapper"
      className="fixed inset-0 w-full h-full bg-[#0b0b0b] flex flex-col justify-center items-center z-[9999] transition-opacity duration-500 font-sans select-none overflow-hidden text-white"
    >
      <div className="relative flex flex-col items-center justify-center">
        {playerReady ? (
          <dotlottie-player
            src={src}
            background="transparent"
            speed="1"
            style={{ width: "240px", height: "240px" }}
            autoplay
            loop
          />
        ) : (
          <div className="w-[240px] h-[240px] flex items-center justify-center">
            <img
              src="/assets/bg-removed-logo.png"
              alt="CLYRA"
              className="w-20 h-20 object-contain animate-pulse"
            />
          </div>
        )}

        {message && (
          <p className="mt-2 text-sm sm:text-base font-semibold text-zinc-300 tracking-wide text-center px-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
