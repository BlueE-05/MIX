'use client'

export default function InfoPage() {
  return (
    <div className="flex gap-4 p-8">
      <div className="w-full max-w-2xl">
        {/* Juego de Unity embebido desde Itch.io */}
        <iframe
          frameBorder="0"
          src="https://itch.io/embed-upload/13527603?color=333333"
          allowFullScreen
          width="900"
          height="620"
          title="Juego de Unity"
        >
          <a href="https://dandanmini.itch.io/trivia-game-crmraydev">
            Play Trivia Game CRMRayDev on itch.io
          </a>
        </iframe>
      </div>
    </div>
  );
}