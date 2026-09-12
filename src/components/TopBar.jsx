function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`
}

export function TopBar({
  timeRemaining,
  quality,
  score,
  streak,
  onReset,
}) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">LP</div>

        <div>
          <span className="brand-eyebrow">
            Gestão da qualidade
          </span>

          <h1>Linha de Produção</h1>
        </div>
      </div>

      <div className="topbar-stats">
        <div className="top-stat">
          <span>Tempo</span>
          <strong>
            {formatTime(timeRemaining)}
          </strong>
        </div>

        <div className="top-stat">
          <span>Qualidade</span>
          <strong>{quality}%</strong>
        </div>

        <div className="top-stat">
          <span>Pontos</span>
          <strong>{score}</strong>
        </div>

        <div
          className={[
            'top-stat',
            streak > 1 ? 'top-stat-streak' : '',
          ].join(' ')}
        >
          <span>Sequência</span>
          <strong>
            {streak > 0 ? `x${Math.min(streak, 3)}` : '—'}
          </strong>
        </div>
      </div>

      <button
        className="button button-secondary"
        type="button"
        onClick={onReset}
      >
        Reiniciar
      </button>
    </header>
  )
}