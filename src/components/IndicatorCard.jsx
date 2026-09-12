import { Line } from 'react-chartjs-2'

export function IndicatorCard({
  indicator,
  selected,
  onSelect,
}) {
  const isOutsideRange =
    indicator.value < indicator.min ||
    indicator.value > indicator.max

  const data = {
    labels: indicator.history.map((_, index) => index),
    datasets: [
      {
        data: indicator.history,
        borderColor: isOutsideRange
          ? '#dc2626'
          : '#2563eb',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  }

  return (
    <button
      type="button"
      className={[
        'indicator-card',
        selected ? 'indicator-card-selected' : '',
        isOutsideRange ? 'indicator-card-alert' : '',
      ].join(' ')}
      onClick={onSelect}
    >
      <div className="indicator-header">
        <div>
          <span className="indicator-label">
            {indicator.label}
          </span>

          <span
            className={
              isOutsideRange
                ? 'status status-danger'
                : 'status status-success'
            }
          >
            {isOutsideRange ? 'Fora do padrão' : 'Normal'}
          </span>
        </div>

        <div className="indicator-value">
          {indicator.value.toFixed(1)}
          <small>{indicator.unit}</small>
        </div>
      </div>

      <div className="indicator-chart">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: {
              intersect: false,
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
                min: indicator.min - (indicator.max - indicator.min),
                max: indicator.max + (indicator.max - indicator.min),
              },
            },
          }}
        />
      </div>

      <div className="indicator-range">
        Faixa ideal: {indicator.min}–{indicator.max}
        {indicator.unit}
      </div>
    </button>
  )
}