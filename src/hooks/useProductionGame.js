import { useEffect, useMemo, useState } from 'react'
import { productionParameters } from '../data/parameters'

const GAME_DURATION = 8 * 60
const UPDATE_INTERVAL = 6000
const EVENT_INTERVAL = 18000
const HISTORY_SIZE = 20

const operationalEvents = [
  {
    parameterId: 'peso',
    title: 'Variação na matéria-prima',
    message: 'O peso dos produtos começou a oscilar.',
    intensity: 1.4,
  },
  {
    parameterId: 'temperatura',
    title: 'Instabilidade no aquecimento',
    message: 'A temperatura do processo sofreu uma alteração.',
    intensity: 1.5,
  },
  {
    parameterId: 'oxigenio',
    title: 'Alteração na selagem',
    message: 'O nível de O₂ residual sofreu uma variação.',
    intensity: 1.5,
  },
  {
    parameterId: 'velocidade',
    title: 'Ritmo de produção irregular',
    message: 'A velocidade da linha foi afetada.',
    intensity: 1.4,
  },
]

function createIndicators(initialValues = {}) {
  return productionParameters.map(parameter => {
    const value =
      initialValues[parameter.id] ??
      parameter.initialValue

    return {
      ...parameter,
      value,
      failures: 0,
      history: Array(HISTORY_SIZE).fill(value),
    }
  })
}

function isOutsideRange(indicator) {
  return (
    indicator.value < indicator.min ||
    indicator.value > indicator.max
  )
}

function distanceFromTarget(
  indicator,
  value = indicator.value,
) {
  const target =
    (indicator.min + indicator.max) / 2

  return Math.abs(value - target)
}

function createEvent(type, message, title = null) {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    message,
  }
}

export function useProductionGame() {
  const [gameStarted, setGameStarted] =
    useState(false)

  const [indicators, setIndicators] =
    useState(() => createIndicators())

  const [selectedId, setSelectedId] =
    useState(null)

  const [timeRemaining, setTimeRemaining] =
    useState(GAME_DURATION)

  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] =
    useState(0)

  const [interventions, setInterventions] =
    useState(0)

  const [
    correctInterventions,
    setCorrectInterventions,
  ] = useState(0)

  const [feedback, setFeedback] =
    useState(null)

  const [events, setEvents] = useState([])

  const finished =
    gameStarted && timeRemaining === 0

  const selectedIndicator = indicators.find(
    indicator => indicator.id === selectedId,
  )

  const addEvent = event => {
    setEvents(current =>
      [event, ...current].slice(0, 8),
    )
  }

  /*
   * Início da partida
   */
  const startGame = initialValues => {
    const configuredIndicators =
      createIndicators(initialValues)

    const incorrectParameters =
      configuredIndicators.filter(
        isOutsideRange,
      )

    const correctCount =
      configuredIndicators.length -
      incorrectParameters.length

    /*
     * 50 pontos por parâmetro configurado corretamente.
     */
    const startupBonus = correctCount * 50

    setIndicators(configuredIndicators)
    setSelectedId(null)

    setTimeRemaining(GAME_DURATION)

    setScore(startupBonus)
    setStreak(0)
    setBestStreak(0)

    setInterventions(0)
    setCorrectInterventions(0)

    setFeedback(null)

    const startupEvents = [
      createEvent(
        incorrectParameters.length === 0
          ? 'success'
          : 'warning',

        incorrectParameters.length === 0
          ? `Configuração inicial adequada. Bônus de +${startupBonus} pontos.`
          : `${incorrectParameters.length} parâmetro(s) foram iniciados fora da faixa recomendada.`,

        'Máquina ligada',
      ),
    ]

    incorrectParameters.forEach(parameter => {
      startupEvents.push(
        createEvent(
          'danger',
          `${parameter.label} iniciou em ${parameter.value}${parameter.unit}. Faixa recomendada: ${parameter.min}–${parameter.max}${parameter.unit}.`,
          'Configuração fora do padrão',
        ),
      )
    })

    setEvents(startupEvents)

    setGameStarted(true)
  }

  /*
   * Cronômetro
   */
  useEffect(() => {
    if (!gameStarted || finished) return

    const timer = setInterval(() => {
      setTimeRemaining(current =>
        current > 0 ? current - 1 : 0,
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, finished])

  /*
   * Variação natural
   */
  useEffect(() => {
    if (!gameStarted || finished) return

    const interval = setInterval(() => {
      const newFailures = []

      setIndicators(current =>
        current.map(indicator => {
          const range =
            indicator.max - indicator.min

          const variation =
            (Math.random() - 0.5) *
            range *
            indicator.variationFactor *
            0.45

          const nextValue =
            indicator.value + variation

          const wasNormal =
            !isOutsideRange(indicator)

          const willFail =
            nextValue < indicator.min ||
            nextValue > indicator.max

          if (wasNormal && willFail) {
            newFailures.push(
              indicator.label,
            )
          }

          return {
            ...indicator,
            value: nextValue,

            failures:
              willFail && wasNormal
                ? indicator.failures + 1
                : indicator.failures,

            history: [
              ...indicator.history.slice(1),
              nextValue,
            ],
          }
        }),
      )

      newFailures.forEach(label => {
        addEvent(
          createEvent(
            'danger',
            `${label} saiu da faixa de operação.`,
            'Desvio detectado',
          ),
        )
      })
    }, UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [gameStarted, finished])

  /*
   * Eventos operacionais
   */
  useEffect(() => {
    if (!gameStarted || finished) return

    const interval = setInterval(() => {
      const event =
        operationalEvents[
          Math.floor(
            Math.random() *
              operationalEvents.length,
          )
        ]

      const direction =
        Math.random() > 0.5 ? 1 : -1

      setIndicators(current =>
        current.map(indicator => {
          if (
            indicator.id !==
            event.parameterId
          ) {
            return indicator
          }

          const range =
            indicator.max - indicator.min

          const disturbance =
            range *
            event.intensity *
            0.65 *
            direction

          const nextValue =
            indicator.value + disturbance

          const wasNormal =
            !isOutsideRange(indicator)

          const willFail =
            nextValue < indicator.min ||
            nextValue > indicator.max

          return {
            ...indicator,

            value: nextValue,

            failures:
              willFail && wasNormal
                ? indicator.failures + 1
                : indicator.failures,

            history: [
              ...indicator.history.slice(1),
              nextValue,
            ],
          }
        }),
      )

      addEvent(
        createEvent(
          'warning',
          event.message,
          event.title,
        ),
      )
    }, EVENT_INTERVAL)

    return () => clearInterval(interval)
  }, [gameStarted, finished])

  /*
   * Intervenção
   */
  const applyCorrection = amount => {
    if (
      !selectedIndicator ||
      !gameStarted ||
      finished
    ) {
      return
    }

    const wasOutside =
      isOutsideRange(selectedIndicator)

    const oldDistance =
      distanceFromTarget(selectedIndicator)

    const correctedValue =
      selectedIndicator.value + amount

    const newDistance =
      distanceFromTarget(
        selectedIndicator,
        correctedValue,
      )

    const movedTowardTarget =
      newDistance < oldDistance

    let scoreChange = 0
    let feedbackResult

    if (!wasOutside) {
      scoreChange = -20

      setStreak(0)

      feedbackResult = {
        type: 'warning',
        title: 'Intervenção desnecessária',
        message:
          'O parâmetro já estava dentro da faixa ideal.',
        points: scoreChange,
      }
    } else if (movedTowardTarget) {
      const multiplier = Math.min(
        streak + 1,
        3,
      )

      scoreChange = 100 * multiplier

      setCorrectInterventions(
        current => current + 1,
      )

      setStreak(current => {
        const next = current + 1

        setBestStreak(best =>
          Math.max(best, next),
        )

        return next
      })

      feedbackResult = {
        type: 'success',
        title: 'Boa decisão',

        message:
          multiplier > 1
            ? `Correção adequada. Sequência x${multiplier}!`
            : 'Você aproximou o processo da faixa ideal.',

        points: scoreChange,
      }
    } else {
      scoreChange = -40

      setStreak(0)

      feedbackResult = {
        type: 'danger',
        title: 'Ajuste incorreto',
        message:
          'A intervenção afastou o parâmetro do valor ideal.',
        points: scoreChange,
      }
    }

    setIndicators(current =>
      current.map(indicator => {
        if (
          indicator.id !==
          selectedIndicator.id
        ) {
          return indicator
        }

        return {
          ...indicator,

          value: correctedValue,

          history: [
            ...indicator.history.slice(1),
            correctedValue,
          ],
        }
      }),
    )

    setScore(current =>
      Math.max(
        0,
        current + scoreChange,
      ),
    )

    setInterventions(
      current => current + 1,
    )

    setFeedback(feedbackResult)

    addEvent(
      createEvent(
        feedbackResult.type,
        feedbackResult.message,
        feedbackResult.title,
      ),
    )
  }

  const totalFailures = useMemo(
    () =>
      indicators.reduce(
        (total, indicator) =>
          total + indicator.failures,
        0,
      ),
    [indicators],
  )

  const indicatorsInFailure = useMemo(
    () =>
      indicators.filter(
        isOutsideRange,
      ).length,
    [indicators],
  )

  const quality = Math.max(
    0,
    Math.round(
      100 -
        totalFailures * 3 -
        indicatorsInFailure * 6,
    ),
  )

  const accuracy =
    interventions === 0
      ? 0
      : Math.round(
          (correctInterventions /
            interventions) *
            100,
        )

  const performance = useMemo(() => {
    if (
      quality >= 90 &&
      score >= 1200
    ) {
      return {
        level: 'Excelente',
        message:
          'Você manteve a linha estável e tomou boas decisões.',
      }
    }

    if (
      quality >= 75 &&
      score >= 600
    ) {
      return {
        level: 'Bom',
        message:
          'A produção terminou com bom controle de qualidade.',
      }
    }

    if (quality >= 60) {
      return {
        level: 'Regular',
        message:
          'A produção foi concluída, mas houve oportunidades de melhoria.',
      }
    }

    return {
      level: 'Atenção',
      message:
        'Os desvios comprometeram a estabilidade da produção.',
    }
  }, [quality, score])

  const resetGame = () => {
    setGameStarted(false)

    setIndicators(
      createIndicators(),
    )

    setSelectedId(null)
    setTimeRemaining(GAME_DURATION)

    setScore(0)
    setStreak(0)
    setBestStreak(0)

    setInterventions(0)
    setCorrectInterventions(0)

    setFeedback(null)
    setEvents([])
  }

  return {
    gameStarted,
    startGame,

    indicators,

    selectedId,
    selectedIndicator,
    setSelectedId,

    timeRemaining,

    score,
    streak,
    bestStreak,

    totalFailures,

    interventions,
    correctInterventions,
    accuracy,

    events,
    feedback,

    quality,
    performance,

    applyCorrection,
    resetGame,

    finished,
  }
}