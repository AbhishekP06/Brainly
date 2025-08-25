function Card() {
  const cardsRow1 = [
    { src: "yt-card.png", alt: "YouTube Card" },
    { src: "spotify-card.png", alt: "Spotify Card" },
  ];

  const cardsRow2 = [
    { src: "pintrest-card.png", alt: "Pinterest Card" },
    { src: "twitter-card.jpeg", alt: "Twitter Card" },
  ];

  return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-screen p-6">
      {/* Row 1 */}
      <div className="flex flex-wrap gap-6">
        {cardsRow1.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-2xl w-auto h-48 flex items-center justify-center overflow-hidden"
          >
            <img
              src={card.src}
              alt={card.alt}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap gap-6">
        {cardsRow2.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-2xl w-auto h-72 flex items-center justify-center overflow-hidden"
          >
            <img
              src={card.src}
              alt={card.alt}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
