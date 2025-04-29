'use client'

export default function InfoPage() {
  return (
    <div className="flex gap-4 p-8">
      <div className="w-full max-w-2xl">
        {/* Juego de Unity embebido desde Itch.io */}
        <iframe
          width="100%"
          height="400"
          src="https://dandanmini.itch.io/trivia-game-crmraydev?secret=P1CbL1qAq6V06Y2YnX4pjBl0Q/embed"
          title="Juego de Unity"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}