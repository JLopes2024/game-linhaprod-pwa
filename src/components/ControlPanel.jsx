export function ControlPanel({
  indicator,
  feedback,
  onApplyCorrection,
}) {
  if (!indicator) {
    return (
      <aside className="control-panel control-panel-empty">
        <div className="empty-icon">↖</div>

        <h3>Selecione um indicador</h3>

        <p>
          Observe a linha e escolha um parâmetro quando
          identificar necessidade de intervenção.
        </p>
      </aside>
    )
  }

  const isOutsideRange =
    indicator.value < indicator.min ||
    indicator.value > indicator.max

  return (
    <aside className="control-panel">
      <span className="eyebrow">
        Central de intervenção
      </span>

      <div className="control-title">
        <div>
          <h3>{indicator.label}</h3>

          <p>
            Faixa ideal: {indicator.min}–{indicator.max}
            {indicator.unit}
          </p>
        </div>

        <strong
          className={[
            'control-value',
            isOutsideRange ? 'danger' : '',
          ].join(' ')}
        >
          {indicator.value.toFixed(1)}
          <small>{indicator.unit}</small>
        </strong>
      </div>

      <div
        className={[
          'parameter-state',
          isOutsideRange
            ? 'parameter-state-danger'
            : 'parameter-state-success',
        ].join(' ')}
      >
        {isOutsideRange
          ? 'Ação recomendada'
          : 'Processo dentro do padrão'}
      </div>

      <div className="correction-grid">
        <button
          type="button"
          className="correction-button"
          onClick={() =>
            onApplyCorrection(-indicator.step)
          }
        >
          <span>−</span>

          Reduzir

          <small>
            {indicator.step}
            {indicator.unit}
          </small>
        </button>

        <button
          type="button"
          className="correction-button"
          onClick={() =>
            onApplyCorrection(indicator.step)
          }
        >
          <span>+</span>

          Aumentar

          <small>
            {indicator.step}
            {indicator.unit}
          </small>
        </button>
      </div>

      {feedback && (
        <div
          className={`decision-feedback decision-feedback-${feedback.type}`}
        >
          <div className="decision-feedback-header">
            <strong>{feedback.title}</strong>

            <span>
              {feedback.points > 0 ? '+' : ''}
              {feedback.points}
            </span>
          </div>

          <p>{feedback.message}</p>
        </div>
      )}

      <div className="control-hint">
        Não é necessário corrigir todos os parâmetros.
        Intervenções sem necessidade também afetam sua
        pontuação.
      </div>
    </aside>
  )
}