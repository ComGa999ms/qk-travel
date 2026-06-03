import React, { useState, useEffect } from "react";

const MediaGallery = ({ images = [], videos = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i < images.length - 1 ? i + 1 : i));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, images.length]);

  const open = (i) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const prev = () => setSelectedIndex((i) => (i > 0 ? i - 1 : i));
  const next = () =>
    setSelectedIndex((i) => (i < images.length - 1 ? i + 1 : i));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="block w-full h-36 overflow-hidden rounded-lg shadow-sm p-0 border-0 bg-transparent"
            aria-label={`Mở ảnh ${i + 1}`}
          >
            <img
              src={src}
              alt={`media-${i}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {videos && videos.length > 0 && (
        <div>
          <h4 className="font-bold text-lg text-gray-900 mb-4">Video</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((v, i) => {
              // Helper to extract YouTube ID
              const getYoutubeId = (url) => {
                if (!url) return null;
                const regExp =
                  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return match && match[2].length === 11 ? match[2] : null;
              };

              const youtubeId = getYoutubeId(v);

              return (
                <div
                  key={i}
                  className="aspect-video bg-black rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  {youtubeId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`Video ${i + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={v} />
                      Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={close}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg z-50 w-10 h-10"
              aria-label="Đóng"
            >
              <i className="fas fa-times"></i>
            </button>

            <img
              src={images[selectedIndex]}
              alt={`large-${selectedIndex}`}
              className="block max-w-full max-h-[80vh] rounded-md"
            />

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  disabled={selectedIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
                  aria-label="Trước"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={next}
                  disabled={selectedIndex === images.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
                  aria-label="Tiếp"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
