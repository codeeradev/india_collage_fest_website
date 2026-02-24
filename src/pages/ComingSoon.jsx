import "./ComingSoon.css";

function ComingSoon() {
  return (
    <main className="coming-soon-page">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />

      <section className="coming-soon-card">
        <p className="chip reveal" style={{ "--delay": "0.08s" }}>
          India Fest
        </p>

        <h1 className="headline reveal" style={{ "--delay": "0.15s" }}>
          We are crafting something unforgettable.
        </h1>

        <p className="subhead reveal" style={{ "--delay": "0.25s" }}>
          We are rebuilding India Fest with richer stories, cleaner booking
          flows, and a premium festival discovery experience. Launch details
          will be announced soon.
        </p>

        <p className="live-pill reveal" style={{ "--delay": "0.35s" }}>
          Coming soon
        </p>

        <div className="cta-row reveal" style={{ "--delay": "0.45s" }}>
          <a className="action action-primary" href="mailto:hello@indiafest.in">
            Get Launch Invite
          </a>
        </div>
      </section>
    </main>
  );
}

export default ComingSoon;
