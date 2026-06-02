// prototype.jsx — single-page version of the full flow.
// Home → pricing → welcome interstitial → monitoring app
// All navigation is in-page via React state; works offline in a standalone bundle.

window.__prototypeLoaded = true; // prevents homepage.jsx from self-rendering

const { useState } = React;

// ── Login screen ──────────────────────────────────────────────────
function LoginScreen({ onSignIn, onBack }) {
  return (
    <div className="login-page">
      <header className="login-header">
        <span className="login-logo" style={{ cursor: 'pointer' }} onClick={onBack}>Civic Lens</span>
      </header>
      <div className="login-body">
        <div className="login-card">
          <h1 className="login-h">Sign in to Civic Lens</h1>
          <p className="login-sub">Access your monitoring dashboard.</p>
          <div className="login-field">
            <label className="login-label">Email address</label>
            <input className="login-input" type="email" placeholder="you@organisation.org" />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input className="login-input" type="password" placeholder="••••••••" />
          </div>
          <a className="login-forgot">Forgot password?</a>
          <button className="login-btn" onClick={onSignIn}>Sign in</button>
          <div className="login-divider">or</div>
          <button className="login-create">Create a new account</button>

        </div>
      </div>
      <div className="login-footer">© 2026 Algorithmic Transparency Institute</div>
    </div>
  );
}

const FreeCallout = (
  <div className="fcA">
    <div className="fcA-big">Free for 14 days</div>
    <div className="fcA-sub">Full features, no credit card needed up front</div>
  </div>
);

// ── Welcome interstitial (treatment A), plan-aware ─────────────────
const CheckBlue = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6.5 9.5 17 4.5 12" stroke="#0969da" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function WelcomeScreen({ plan, onStart, onSeePlans }) {
  return (
    <MonitorApp overlay={
      <div className="tw-overlay">
        <div className="tw-dim"></div>
        <div className="tw-modal">
          <div className="tw-badge">{CheckBlue}</div>
          <div className="tw-eyebrow">{plan.toUpperCase()} PLAN · FREE TRIAL</div>
          <h2>You're all set — welcome to Civic Lens</h2>
          <p>You're trying the <b>{plan} plan</b> free — full access to every feature, with no payment required. Your trial runs for 14 days and ends on <b>June 16, 2026</b>.</p>
          <div className="tw-meter">
            <div className="tw-meter-row"><span>Day 1 of 14</span><span>14 days left</span></div>
            <div className="tw-meter-bar"><div className="tw-meter-fill" style={{ width: '7%' }}></div></div>
          </div>
          <div className="tw-actions">
            <button className="tw-btn-primary" onClick={onStart}>Start exploring</button>
            <a className="tw-link" onClick={onSeePlans}>See plans &amp; pricing</a>
          </div>
          <div className="tw-foot">We'll remind you before your trial ends. No charge until you choose a plan.</div>
        </div>
      </div>
    } />
  );
}

// ── App screen with the T1 centered-minimal trial card ─────────────
function AppScreen({ plan, onSubscribe }) {
  return (
    <MonitorApp sidebarCard={
      <div className="mc t1">
        <div className="mc-plan">{plan} plan</div>
        <div className="mc-cap">Free trial · <b>14 days left</b></div>
        <button className="mc-btn-dark" onClick={onSubscribe}>Subscribe</button>
      </div>
    } />
  );
}

function Prototype() {
  const [screen, setScreen] = useState('home');
  const [plan, setPlan] = useState('Advanced');
  const [showModal, setShowModal] = useState(true);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const goConfirmation = (name) => { setPlan(name); setShowModal(true); setScreen('monitoring_membership_confirmation'); };

  if (screen === 'home') {
    return (
      <HomePage
        onGetStarted={() => setScreen('login')}
        onSubscribe={goConfirmation}
      />
    );
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onSignIn={() => setScreen('pricing')}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'monitoring_membership_confirmation') {
    return (
      <MonitorApp
        sidebarCard={
          <div className="mc t1">
            <div className="mc-plan">{plan} plan</div>
            <div className="mc-cap">Free trial · <b>14 days left</b></div>
            <button className="mc-btn-dark" onClick={() => setScreen('membership_no_free')}>Subscribe</button>
          </div>
        }
        overlay={showModal ? (
          <div className="tw-overlay">
            <div className="tw-dim"></div>
            <div className="tw-modal">
              <div className="tw-badge">{CheckBlue}</div>
              <div className="tw-eyebrow">{plan.toUpperCase()} PLAN · FREE TRIAL</div>
              <h2>You're all set — welcome to Civic Lens</h2>
              <p>You're trying the <b>{plan} plan</b> free — full access to every feature, with no payment required. Your trial runs for 14 days and ends on <b>June 16, 2026</b>.</p>
              <div className="tw-meter">
                <div className="tw-meter-row"><span>Day 1 of 14</span><span>14 days left</span></div>
                <div className="tw-meter-bar"><div className="tw-meter-fill" style={{ width: '7%' }}></div></div>
              </div>
              <div className="tw-actions">
                <button className="tw-btn-primary" onClick={() => setShowModal(false)}>Start exploring</button>
                <a className="tw-link" onClick={() => setScreen('membership_no_free')}>See plans &amp; pricing</a>
              </div>
              <div className="tw-foot">We'll remind you before your trial ends. No charge until you choose a plan.</div>
            </div>
          </div>
        ) : null}
      />
    );
  }
  if (screen === 'membership_no_free') {
    return (
      <PricingPage
        onSubscribe={(name) => { setPlan(name); setShowSubscribeModal(true); setScreen('monitoring_subscribed'); }}
        onGetStarted={() => { setShowSubscribeModal(true); setScreen('monitoring_subscribed'); }}
      />
    );
  }

  if (screen === 'monitoring_subscribed') {
    return (
      <MonitorApp
        overlay={showSubscribeModal ? (
          <div className="tw-overlay">
            <div className="tw-dim"></div>
            <div className="tw-modal">
              <div className="tw-badge" style={{ background: '#dafbe1' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6.5 9.5 17 4.5 12" stroke="#1a7f37" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="tw-eyebrow">{plan.toUpperCase()} PLAN · SUBSCRIPTION CONFIRMED</div>
              <h2>You're now subscribed to {plan}</h2>
              <p>Your <b>{plan} plan</b> is now active. You have full access to every {plan} feature starting today.</p>
              <div className="tw-actions">
                <button className="tw-btn-primary" onClick={() => setShowSubscribeModal(false)}>Go to dashboard</button>
              </div>
              <div className="tw-foot">You'll be billed on the 2nd of each month. Manage your subscription in Account Settings.</div>
            </div>
          </div>
        ) : null}
      />
    );
  }

  return (
    <PricingPage
      freeCallout={FreeCallout}
      onSubscribe={goConfirmation}
      onGetStarted={() => { window.scrollTo(0,0); }}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Prototype />);
