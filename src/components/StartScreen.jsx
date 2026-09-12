import { useMemo, useState } from 'react'
import { productionParameters } from '../data/parameters'

const safeLimits = {
  peso: { min: 40, max: 60 },
  temperatura: { min: 150, max: 200 },
  oxigenio: { min: 0, max: 5 },
  velocidade: { min: 80, max: 160 },
}

export function StartScreen({ onStart }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      productionParameters.map(parameter => [
        parameter.id,
        parameter.initialValue,
      ]),
    ),
  )

  const configurationStatus = useMemo(() => {
    return productionParameters.map(parameter => {
      const value = Number(values[parameter.id])

      return {
        id: parameter.id,
        valid:
          value >= parameter.min &&
          value <= parameter.max,
      }
    })
  }, [values])

  const parametersInRange =
    configurationStatus.filter(item => item.valid).length

  const allCorrect =
    parametersInRange === productionParameters.length

  function updateValue(parameter, nextValue) {
    const limits = safeLimits[parameter.id]

    const value = Math.min(
      limits.max,
      Math.max(limits.min, nextValue),
    )

    setValues(current => ({
      ...current,
      [parameter.id]: value,
    }))
  }

  function handleChange(parameter, rawValue) {
    if (rawValue === '') {
      setValues(current => ({
        ...current,
        [parameter.id]: '',
      }))

      return
    }

    const value = Number(rawValue)

    if (Number.isNaN(value)) {
      return
    }

    updateValue(parameter, value)
  }

  function handleStart() {
    const parsedValues = Object.fromEntries(
      productionParameters.map(parameter => [
        parameter.id,
        Number(values[parameter.id]),
      ]),
    )

    const hasInvalidValue =
      productionParameters.some(parameter =>
        Number.isNaN(parsedValues[parameter.id]),
      )

    if (hasInvalidValue) {
      return
    }

    onStart(parsedValues)
  }

  return (
    <main className="start-screen">
      <section className="start-card">
        <div className="start-brand">
          <div className="brand-mark">LP</div>

          <div>
            <span className="eyebrow">
              Simulador de produção
            </span>

            <h1>Linha de Produção</h1>
          </div>
        </div>

        <div className="start-intro">
          <span className="start-step">
            Preparação da máquina
          </span>

          <h2>Configure os parâmetros iniciais</h2>

          <p>
            Antes de ligar a linha, defina os valores de
            operação. A configuração inicial também faz
            parte da sua avaliação.
          </p>
        </div>

        <div className="startup-parameters">
          {productionParameters.map(parameter => {
            const value = values[parameter.id]

            const numericValue = Number(value)

            const insideRange =
              numericValue >= parameter.min &&
              numericValue <= parameter.max

            const limits = safeLimits[parameter.id]

            return (
              <div
                className={[
                  'startup-parameter',
                  insideRange
                    ? 'startup-parameter-ok'
                    : 'startup-parameter-warning',
                ].join(' ')}
                key={parameter.id}
              >
                <div className="startup-parameter-info">
                  <div>
                    <strong>{parameter.label}</strong>

                    <span>
                      Faixa recomendada: {parameter.min}–
                      {parameter.max}
                      {parameter.unit}
                    </span>
                  </div>

                  <span
                    className={[
                      'startup-status',
                      insideRange
                        ? 'startup-status-ok'
                        : 'startup-status-warning',
                    ].join(' ')}
                  >
                    {insideRange
                      ? 'Configuração adequada'
                      : 'Fora da faixa'}
                  </span>
                </div>

                <div className="startup-control">
                  <button
                    type="button"
                    onClick={() =>
                      updateValue(
                        parameter,
                        numericValue - parameter.step,
                      )
                    }
                  >
                    −
                  </button>

                  <div className="startup-input-wrapper">
                    <input
                      type="number"
                      value={value}
                      min={limits.min}
                      max={limits.max}
                      step={parameter.step}
                      onChange={event =>
                        handleChange(
                          parameter,
                          event.target.value,
                        )
                      }
                    />

                    <span>{parameter.unit}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updateValue(
                        parameter,
                        numericValue + parameter.step,
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <div className="startup-safe-range">
                  Limite permitido: {limits.min}–
                  {limits.max}
                  {parameter.unit}
                </div>
              </div>
            )
          })}
        </div>

        <div className="startup-summary">
          <div>
            <span>Parâmetros adequados</span>

            <strong>
              {parametersInRange}/
              {productionParameters.length}
            </strong>
          </div>

          <p>
            {allCorrect
              ? 'A máquina está pronta para iniciar em condições ideais.'
              : 'Você pode iniciar assim mesmo, mas a linha começará com parâmetros fora do padrão.'}
          </p>
        </div>

        <button
          type="button"
          className="start-machine-button"
          onClick={handleStart}
        >
          <span className="power-icon">⏻</span>

          <span>
            <strong>Ligar máquina</strong>
            <small>Iniciar turno de produção</small>
          </span>
        </button>
      </section>
    </main>
  )
}