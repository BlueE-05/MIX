'use client'

export default function InfoPage() {
  return (
    <div className="flex gap-4 p-8">
      <div className="w-full max-w-2xl">
        {/* Juego de Unity embebido desde Itch.io */}
        <iframe
          width="100%"
          height="400"
          src="https://dandanmini.itch.io/trivia-game-crmraydev/embed"
          title="Juego de Unity"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}