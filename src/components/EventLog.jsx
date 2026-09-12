export function EventLog({ events }) {
  return (
    <section className="event-log">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">
            Produção
          </span>

          <h2>Eventos recentes</h2>
        </div>
      </div>

      <div className="event-list">
        {events.length === 0 && (
          <div className="event event-info">
            Nenhum evento registrado.
          </div>
        )}

        {events.map(event => (
          <div
            key={event.id}
            className={`event event-${event.type}`}
          >
            <span className="event-dot" />

            <div>
              {event.title && (
                <strong>{event.title}</strong>
              )}

              <span>{event.message}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}