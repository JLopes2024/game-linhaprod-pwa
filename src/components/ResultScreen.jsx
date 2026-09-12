export function ResultScreen({
  quality,
  score,
  totalFailures,
  interventions,
  accuracy,
  bestStreak,
  performance,
  onReset,
}) {
  return (
    <main className="result-screen">
      <div className="result-card">
        <span className="eyebrow">
          Turno encerrado
        </span>

        <h1>{performance.level}</h1>

        <p>{performance.message}</p>

        <div className="result-score">
          <strong>{score}</strong>
          <span>pontos</span>
        </div>

        <div className="result-quality">
          Qualidade final: <strong>{quality}%</strong>
        </div>

        <div className="result-stats">
          <div>
            <span>Falhas</span>
            <strong>{totalFailures}</strong>
          </div>

          <div>
            <span>Intervenções</span>
            <strong>{interventions}</strong>
          </div>

          <div>
            <span>Precisão</span>
            <strong>{accuracy}%</strong>
          </div>

          <div>
            <span>Melhor sequência</span>
            <strong>x{bestStreak}</strong>
          </div>
        </div>

        <div className="result-learning">
          <strong>Aprendizado do turno</strong>

          <p>
            O objetivo não é fazer o maior número de
            ajustes. Um bom controle de qualidade exige
            identificar quando uma intervenção realmente
            é necessária e escolher a direção correta.
          </p>
        </div>

        <button
          className="button button-primary"
          type="button"
          onClick={onReset}
        >
          Iniciar novo turno
        </button>
      </div>
    </main>
  )
}