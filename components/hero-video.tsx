"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface HeroVideoProps {
  videoId?: string;
  title?: string;
}

/**
 * Lightweight YouTube player card for the projects hero.
 * Shows the video poster + a play overlay; only loads the iframe on click
 * (keeps the hero fast — no third-party script until the user opts in).
 */
export function HeroVideo({
  videoId = "I_fveQqYDxY",
  title = "MasteringBackend Projects demo",
}: HeroVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0B1120] shadow-2xl">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 w-full h-full"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition-colors group-hover:from-black/40" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#13AECE] text-white shadow-lg transition-transform group-hover:scale-110">
                <Play className="w-7 h-7 md:w-8 md:h-8 ml-1 fill-white" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
