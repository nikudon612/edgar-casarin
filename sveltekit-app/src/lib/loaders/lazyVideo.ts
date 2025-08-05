// src/lib/actions/lazyVideo.ts
import type { Action } from 'svelte/action';

export const lazyVideo: Action<HTMLVideoElement> = (video) => {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Copy data-src → src, then load the video
        video.querySelectorAll('source').forEach((s) => {
          const src = s.getAttribute('data-src');
          if (src) s.setAttribute('src', src);
        });
        video.load();
        io.disconnect();
      }
    },
    {
      rootMargin: '200px',    // start loading when video is 200px from viewport
      threshold: 0.1
    }
  );
  io.observe(video);

  return {
    destroy() {
      io.disconnect();
    }
  };
};
