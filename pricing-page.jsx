// PricingPage.jsx — faithful recreation of the Civic Lens "Choose your plan" page.
// Renders the full page; `freeCallout` is dropped in the slot between the
// subtitle and the pricing table. Exports PricingPage to window.

const CL_PLANS = [
  {
    name: 'Basic',
    desc: 'For small newsrooms and research teams',
    price: '$100',
    sub: 'per month / $1,000 per year',
    cta: 'Subscribe',
    ctaStyle: 'solid',
    features: [
      { t: 'Everything in Free, plus:', ok: true },
      { t: 'Full monitoring access', ok: true },
      { t: 'Unlimited searches with filters', ok: true },
      { t: 'Up to 5 team members', ok: true },
      { t: '1 hour onboarding', ok: true },
      { t: 'No channel tracking credits', ok: false },
    ],
  },
  {
    name: 'Standard',
    desc: 'For growing organizations and research institutions',
    price: '$500',
    sub: 'per month / $5,000 per year',
    cta: 'Subscribe',
    ctaStyle: 'solid',
    features: [
      { t: 'Everything in Basic, plus:', ok: true },
      { t: '500 channel tracking credits/year', ok: true },
      { t: 'Access to 5 Public Actor Sets', ok: true },
      { t: '25 private Lists', ok: true },
      { t: 'Unlimited SMS-based tiplines', ok: true },
      { t: '50 CSV exports per month', ok: true },
      { t: 'Up to 10 team members', ok: true },
    ],
  },
  {
    name: 'Advanced',
    desc: 'For large newsrooms and advanced research teams',
    price: '$1,000',
    sub: 'per month / $10,000 per year',
    cta: 'Subscribe',
    ctaStyle: 'solid',
    features: [
      { t: 'Everything in Standard, plus:', ok: true },
      { t: '1,000 channel tracking credits/year', ok: true },
      { t: 'API rate limit of 500 requests/hour', ok: true },
      { t: 'Access to 10 Public Actor Sets', ok: true },
      { t: '10 Projects with content labeling', ok: true },
      { t: 'Create up to 5 Public Dashboards', ok: true },
      { t: 'Up to 50 private Lists', ok: true },
      { t: '500 CSV exports per month', ok: true },
      { t: 'Up to 25 team members', ok: true },
    ],
  },
  {
    name: 'Pro',
    desc: 'For enterprise organizations and data-driven institutions',
    price: '$2,500',
    sub: 'per month / $25,000 per year',
    cta: 'Contact Sales',
    ctaStyle: 'outline',
    features: [
      { t: 'Everything in Advanced, plus:', ok: true },
      { t: '10,000 channel tracking credits/year', ok: true },
      { t: 'API rate limit of 5,000 requests/hour', ok: true },
      { t: 'Private Actor Sets and unlimited Public Actor Sets', ok: true },
      { t: 'Unlimited Projects and Pipelines', ok: true },
      { t: 'Unlimited Public and Private Dashboards', ok: true },
      { t: 'Up to 100 private Lists', ok: true },
      { t: 'Unlimited CSV exports', ok: true },
      { t: 'Up to 50 team members', ok: true },
    ],
  },
];

function ClCheck() {
  return (
    <svg className="cl-fi-ic" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.5 4.5 6.5 11.5 2.75 7.75" stroke="#2da44e" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ClX() {
  return (
    <svg className="cl-fi-ic" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="#8a929c" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function ClChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginRight: 7 }}>
      <path d="M4 10l4-4 4 4" stroke="#24292f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ClChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginLeft: 5, opacity: 0.55 }}>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClPlanColumn({ plan, idx, onSubscribe }) {
  return (
    <div className="cl-col" style={{ borderLeft: idx === 0 ? 'none' : '1px solid #ededf0' }}>
      <h3 className="cl-plan-name">{plan.name}</h3>
      <p className="cl-plan-desc">{plan.desc}</p>
      <div className="cl-price">
        <span className="cl-price-amt">{plan.price}</span>
        <sup className="cl-price-cur">USD</sup>
      </div>
      <p className="cl-price-sub">{plan.sub}</p>
      {plan.ctaStyle === 'solid' ? (
        onSubscribe ? (
          <button className="cl-btn cl-btn-solid" onClick={() => onSubscribe(plan.name)}>{plan.cta}</button>
        ) : (
          <a className="cl-btn cl-btn-solid" href={`monitoring_membership_confirmation.html?plan=${encodeURIComponent(plan.name)}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>{plan.cta}</a>
        )
      ) : (
        <button className="cl-btn cl-btn-outline">{plan.cta}</button>
      )}
      <div className="cl-col-divider"></div>
      <div className="cl-included"><ClChevronUp />What's included</div>
      <ul className="cl-features">
        {plan.features.map((f, i) => (
          <li className="cl-feature" key={i}>
            {f.ok ? <ClCheck /> : <ClX />}
            <span className={f.ok ? 'cl-feature-txt' : 'cl-feature-txt cl-feature-off'}>{f.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingPage({ freeCallout, onSubscribe, onGetStarted }) {
  return (
    <div className="cl">
      {/* Header */}
      <header className="cl-header">
        <div className="cl-wrap cl-header-wrap">
          <div className="cl-logo">Civic Lens</div>
          <nav className="cl-nav">
            <a className="cl-nav-link" href="#">Features</a>
            <a className="cl-nav-link" href="#">Pricing</a>
            <a className="cl-nav-link" href="#">FAQ</a>
            <a className="cl-nav-link" href="#">Dashboard</a>
            {onGetStarted ? (
              <button className="cl-getstarted" onClick={onGetStarted}>Get Started</button>
            ) : (
              <a className="cl-getstarted" href="monitoring_membership_confirmation.html" style={{ textDecoration: 'none', display: 'inline-block' }}>Get Started</a>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="cl-hero">
        <h1 className="cl-h1">Choose your plan</h1>
        <p className="cl-hero-sub">From individual researchers to enterprise teams, we have a plan that fits your needs.</p>
      </section>

      {/* Free callout slot — only renders when a callout is provided */}
      {freeCallout && <div className="cl-wrap cl-free-slot">{freeCallout}</div>}

      {/* Pricing table */}
      <section className="cl-wrap cl-table-wrap">
        <div className="cl-table">
          {CL_PLANS.map((plan, i) => (
            <ClPlanColumn plan={plan} idx={i} key={plan.name} onSubscribe={onSubscribe} />
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="cl-elig">
        <div className="cl-wrap cl-elig-inner">
          <h2 className="cl-elig-h">Eligibility</h2>
          <p className="cl-elig-p">Civic Lens is available to journalists, researchers, academics, civil society organizations, and other professionals working to understand and combat misinformation. We review all applications to ensure our platform is used responsibly.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="cl-footer">
        <div className="cl-wrap cl-footer-top">
          <div className="cl-footer-brand">
            <div className="cl-logo">Civic Lens</div>
            <div className="cl-footer-dev">Developed by the <a className="cl-footer-devlink" href="#">Algorithmic Transparency Institute</a><ClChevronRight /></div>
          </div>
          <div className="cl-footer-cols">
            <div className="cl-footer-col">
              <div className="cl-footer-col-h">Product</div>
              <a className="cl-footer-link" href="#">Features<ClChevronRight /></a>
              <a className="cl-footer-link" href="#">Pricing<ClChevronRight /></a>
              <a className="cl-footer-link" href="#">FAQ<ClChevronRight /></a>
            </div>
            <div className="cl-footer-col">
              <div className="cl-footer-col-h">Company</div>
              <a className="cl-footer-link" href="#">About ATI<ClChevronRight /></a>
              <a className="cl-footer-link" href="#">Contact<ClChevronRight /></a>
            </div>
            <div className="cl-footer-col">
              <div className="cl-footer-col-h">Legal</div>
              <a className="cl-footer-link" href="#">Privacy Policy<ClChevronRight /></a>
              <a className="cl-footer-link" href="#">Terms of Service<ClChevronRight /></a>
            </div>
          </div>
        </div>
        <div className="cl-footer-bottom">
          <div className="cl-wrap">© 2026 Algorithmic Transparency Institute. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

window.PricingPage = PricingPage;
window.CL_PLANS = CL_PLANS;
window.ClPlanColumn = ClPlanColumn;
window.ClChevronRight = ClChevronRight;
