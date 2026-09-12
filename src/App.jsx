import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

import './App.css'

import { StartScreen } from './components/StartScreen'
import { TopBar } from './components/TopBar'
import { ProductionLine } from './components/ProductionLine'
import { ControlPanel } from './components/ControlPanel'
import { EventLog } from './components/EventLog'
import { ResultScreen } from './components/ResultScreen'

import { useProductionGame } from './hooks/useProductionGame'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

function App() {
  const {
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
    accuracy,

    events,
    feedback,

    quality,
    performance,

    applyCorrection,
    resetGame,

    finished,
  } = useProductionGame()

  if (!gameStarted) {
    return (
      <StartScreen
        onStart={startGame}
      />
    )
  }

  if (finished) {
    return (
      <ResultScreen
        quality={quality}
        score={score}
        totalFailures={totalFailures}
        interventions={interventions}
        accuracy={accuracy}
        bestStreak={bestStreak}
        performance={performance}
        onReset={resetGame}
      />
    )
  }

  return (
    <div className="app-shell">
      <TopBar
        timeRemaining={timeRemaining}
        quality={quality}
        score={score}
        streak={streak}
        onReset={resetGame}
      />

      <main className="game-layout">
        <div className="game-main">
          <ProductionLine
            indicators={indicators}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          <EventLog
            events={events}
          />
        </div>

        <ControlPanel
          indicator={selectedIndicator}
          feedback={feedback}
          onApplyCorrection={applyCorrection}
        />
      </main>
    </div>
  )
}

export default App