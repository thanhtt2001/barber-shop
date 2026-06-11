export default function BranchMap({ branch }) {
  const { googleMapsEmbedUrl, name, googleMapsUrl } = branch;

  if (!googleMapsEmbedUrl) {
    return (
      <div className="w-full h-52 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-gray-500 text-sm font-medium">Bản đồ chưa cập nhật</p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-brand hover:underline font-medium"
        >
          Tìm kiếm trên Google Maps →
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-52 rounded-xl overflow-hidden border border-gray-200">
      <iframe
        title={`Bản đồ ${name}`}
        src={googleMapsEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label={`Bản đồ vị trí ${name}`}
      />
    </div>
  );
}
