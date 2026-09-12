import { IndicatorCard } from './IndicatorCard'

export function ProductionLine({
  indicators,
  selectedId,
  onSelect,
}) {
  return (
    <section className="production-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Produção ativa</span>
          <h2>Acompanhe a linha</h2>
        </div>

        <div className="production-running">
          <span className="production-dot" />
          Linha em operação
        </div>
      </div>

      <div className="factory-line">
        <div className="machine">
          <span>Entrada</span>
          <strong>Matéria-prima</strong>
        </div>

        <div className="conveyor">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="machine">
          <span>Processo</span>
          <strong>Produção</strong>
        </div>

        <div className="conveyor">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="machine">
          <span>Saída</span>
          <strong>Produto final</strong>
        </div>
      </div>

      <div className="indicator-grid">
        {indicators.map(indicator => (
          <IndicatorCard
            key={indicator.id}
            indicator={indicator}
            selected={indicator.id === selectedId}
            onSelect={() => onSelect(indicator.id)}
          />
        ))}
      </div>
    </section>
  )
}