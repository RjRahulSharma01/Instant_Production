import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiX } from 'react-icons/fi';

const FALLBACK_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';

function VideoGallery({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoSrc, setVideoSrc] = useState(FALLBACK_VIDEO);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  const openVideo = (video) => {
    setActiveVideo(video);
    setVideoSrc(video?.video || FALLBACK_VIDEO);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  const handleVideoError = () => {
    if (videoSrc !== FALLBACK_VIDEO) {
      setVideoSrc(FALLBACK_VIDEO);
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  };

  return (
    <section id="blog" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">Video Gallery</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Modern storytelling, curated for premium campaigns.</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video, index) => (
            <motion.article
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5"
            >
              <div className="relative">
                <div style={{ aspectRatio: '16/9' }} className="overflow-hidden bg-zinc-900">
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80'; }} />
                </div>
                <button
                  onClick={() => openVideo(video)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/50"
                  aria-label={`Play ${video.title}`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/90 text-black shadow-lg">
                    <FiPlay size={24} />
                  </span>
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">{video.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{video.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{video.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {activeVideo ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-8" onClick={closeVideo}>
          <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-zinc-950 p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between px-2 py-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">{activeVideo.title}</p>
              <button onClick={closeVideo} className="rounded-full border border-white/10 p-2 text-white">
                <FiX size={20} />
              </button>
            </div>
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              className="mt-2 max-h-[60vh] w-full rounded-[1.25rem] bg-black object-contain"
              poster={activeVideo.thumbnail}
              onError={handleVideoError}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default VideoGallery;
