// homepage.jsx — Civic Lens marketing homepage.
// Accepts optional onGetStarted / onSubscribe callbacks for in-page prototype
// use. Falls back to href navigation when callbacks are omitted (standalone).
// Exports HomePage to window; does NOT self-render.

const PRICING = window.CL_PLANS;
const PlanCol = window.ClPlanColumn;

const Arrow = () =>
<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


// ── gradient-panel glyphs ──────────────────────────────────────────
const SatelliteGlyph =
<svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true" style={{ opacity: 0.95 }}>
    {/* dish bowl */}
    <ellipse cx="40" cy="55" rx="26" ry="13" transform="rotate(-40 40 55)" stroke="#fff" strokeWidth="3.6" />
    {/* feed arm + horn */}
    <path d="M40 55 56 39" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="58" cy="37" r="4" fill="#fff" />
    {/* mast + base */}
    <path d="M33 61 28 82M47 67 41 82M23 82h24" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    {/* signal waves */}
    <path d="M64 33a15 15 0 0 1 5 11" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <path d="M69 23a27 27 0 0 1 9 20" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.68" />
  </svg>;

const SearchGlyph =
<svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
    <circle cx="38" cy="38" r="22" stroke="#fff" strokeWidth="4.5" />
    <path d="M54 54 70 70" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    <path d="M30 38h16M38 30v16" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" opacity="0.85" />
  </svg>;

const PeopleGlyph =
<svg width="100" height="92" viewBox="0 0 100 92" fill="none" aria-hidden="true">
    <circle cx="38" cy="34" r="13" stroke="#fff" strokeWidth="4" />
    <path d="M18 70c0-12 9-20 20-20s20 8 20 20" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <circle cx="68" cy="38" r="10" stroke="#fff" strokeWidth="4" opacity="0.85" />
    <path d="M62 68c0-9 5-16 12-16s12 6 12 15" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
  </svg>;


function FAQItem({ q, a, open }) {
  return (
    <details className="hp-faq-item" open={open}>
      <summary className="hp-faq-q">{q}<span className="hp-faq-plus">+</span></summary>
      <p className="hp-faq-a">{a}</p>
    </details>);

}

function HomePage({ onGetStarted, onSubscribe } = {}) {
  const goPlans = onGetStarted || (() => { location.href = 'membership.html'; });
  const doSubscribe = onSubscribe || ((name) => { location.href = 'monitoring_membership_confirmation.html?plan=' + encodeURIComponent(name); });

  return (
    <div className="hp">
      {/* Header */}
      <header className="hp-header">
        <div className="hp-wrap hp-header-in">
          <div className="hp-logo">Civic Lens</div>
          <nav className="hp-nav">
            <a className="hp-nav-link" href="#features">Features</a>
            <a className="hp-nav-link" href="#pricing">Pricing</a>
            <a className="hp-nav-link" href="#faq">FAQ</a>
            <a className="hp-nav-link" href="#">Sign In</a>
            <button className="hp-btn-dark" onClick={goPlans}>Get Started</button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hp-wrap hp-hero">
        <span className="hp-badge">Social Media Intelligence Platform</span>
        <h1 className="hp-h1">Decode what really matters across social media</h1>
        <p className="hp-hero-p">Developed by the Algorithmic Transparency Institute for journalists, researchers, and change makers. Monitor 250,000+ channels across platforms with powerful search and analysis tools.</p>
        <div className="hp-hero-cta">
          <button className="hp-btn-dark" onClick={goPlans}>Get Started Free</button>
          <a className="hp-btn-outline" href="#features">Explore Features</a>
        </div>
      </section>

      {/* Feature blocks */}
      <section id="features" className="hp-wrap hp-features-section">
        <div className="hp-feature">
          <div className="hp-feature-text">
            <h2 className="hp-feature-h">Monitor Social Media at Scale</h2>
            <p className="hp-feature-p">Track over 250,000+ channels across Facebook, Twitter/X, YouTube, Instagram, Telegram, and more. Get daily automated updates and stay ahead of emerging narratives and trends before they go viral.</p>
            <a className="hp-feature-link" href="#" onClick={e=>{e.preventDefault();goPlans();}}>Start monitoring <Arrow /></a>
          </div>
          <div className="hp-feature-panel"><div className="hp-panel hp-panel-monitor">{SatelliteGlyph}</div></div>
        </div>

        <div className="hp-feature rev">
          <div className="hp-feature-text">
            <h2 className="hp-feature-h">Powerful Research Tools</h2>
            <p className="hp-feature-p">Advanced boolean search with granular filters for platform, date range, engagement metrics, and more. Export to CSV or leverage our API for custom integrations with your existing research workflows.</p>
            <a className="hp-feature-link" href="#" onClick={e=>{e.preventDefault();goPlans();}}>Explore search <Arrow /></a>
          </div>
          <div className="hp-feature-panel"><div className="hp-panel hp-panel-research">{SearchGlyph}</div></div>
        </div>

        <div className="hp-feature">
          <div className="hp-feature-text">
            <h2 className="hp-feature-h">Collaborate with Your Team</h2>
            <p className="hp-feature-p">Create and share custom lists, work with team members on investigations, and access public actor sets from the research community. Build on the work of others to accelerate your research.</p>
            <a className="hp-feature-link" href="#" onClick={e=>{e.preventDefault();goPlans();}}>See collaboration tools <Arrow /></a>
          </div>
          <div className="hp-feature-panel"><div className="hp-panel hp-panel-collab">{PeopleGlyph}</div></div>
        </div>
      </section>

      {/* Why */}
      <section className="hp-why">
        <div className="hp-wrap">
          <h2 className="hp-section-h">Why researchers choose Civic Lens</h2>
          <p className="hp-section-sub">Built by researchers, for researchers. We understand the unique challenges of tracking online discourse at scale.</p>
          <div className="hp-why-grid">
            <div><h3 className="hp-why-item-h">Real-time Updates</h3><p className="hp-why-item-p">Channels are updated daily with new content. High-priority channels can be updated more frequently upon request.</p></div>
            <div><h3 className="hp-why-item-h">Multi-Platform Coverage</h3><p className="hp-why-item-p">One dashboard for Facebook, Twitter/X, YouTube, TikTok, Instagram, Telegram, VK, Rumble, and more platforms.</p></div>
            <div><h3 className="hp-why-item-h">Data Export &amp; API</h3><p className="hp-why-item-p">Export your research to CSV or connect via our REST API for programmatic access and custom analysis pipelines.</p></div>
            <div><h3 className="hp-why-item-h">Research Community</h3><p className="hp-why-item-p">Access shared actor sets and lists from the research community. Collaborate on investigations with peers worldwide.</p></div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="hp-pricing">
        <div className="hp-wrap">
          <h2 className="hp-section-h">Choose your plan</h2>
          <p className="hp-section-sub">From individual researchers to enterprise teams, we have a plan that fits your needs.</p>
          <div className="cl-table">
            {PRICING.map((plan, i) =>
            <PlanCol plan={plan} idx={i} key={plan.name} onSubscribe={doSubscribe} />
            )}
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="hp-trusted">
        <div className="hp-wrap">
          <h2 className="hp-section-h">Trusted by leading researchers</h2>
          <p className="hp-section-sub">Journalists, academics, and civil society organizations rely on Civic Lens for their most important investigations.</p>
          <div className="hp-testimonials">
            <div>
              <div className="hp-quote-mark">&ldquo;</div>
              <p className="hp-quote-text">Civic Lens has transformed how we track misinformation campaigns. What used to take weeks now takes hours. The cross-platform search is incredibly powerful.</p>
              <div className="hp-quote-by"><span className="hp-avatar"></span><span className="hp-quote-name">Dr. Sarah Chen</span></div>
            </div>
            <div>
              <div className="hp-quote-mark">&ldquo;</div>
              <p className="hp-quote-text">The ability to create shared lists and collaborate with colleagues across institutions has been game-changing for our research consortium.</p>
              <div className="hp-quote-by"><span className="hp-avatar"></span><span className="hp-quote-name">Marcus Johnson</span></div>
            </div>
            <div>
              <div className="hp-quote-mark">&ldquo;</div>
              <p className="hp-quote-text">As a journalist on deadline, I need fast, reliable access to social media data. Civic Lens delivers every time with their comprehensive channel coverage.</p>
              <div className="hp-quote-by"><span className="hp-avatar"></span><span className="hp-quote-name">Elena Rodriguez</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Research in action */}
      <section className="hp-research">
        <div className="hp-wrap">
          <h2 className="hp-section-h">Research in action</h2>
          <p className="hp-section-sub">See how researchers are using Civic Lens to uncover important stories.</p>
          <div className="hp-cases">
            <div>
              <h3 className="hp-case-h">Election Integrity Monitoring</h3>
              <p className="hp-case-p">How a coalition of researchers tracked coordinated inauthentic behavior across 18 countries during the 2024 election cycle.</p>
              <a className="hp-case-link" href="#">Learn more <Arrow /></a>
            </div>
            <div>
              <h3 className="hp-case-h">Health Misinformation Study</h3>
              <p className="hp-case-p">Academic researchers used Civic Lens to map the spread of vaccine misinformation across Telegram and Facebook groups.</p>
              <a className="hp-case-link" href="#">Learn more <Arrow /></a>
            </div>
            <div>
              <h3 className="hp-case-h">Climate Denial Networks</h3>
              <p className="hp-case-p">Investigative journalists uncovered a network of coordinated accounts spreading climate disinformation using our cross-platform analysis.</p>
              <a className="hp-case-link" href="#">Learn more <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="hp-faq">
        <div className="hp-wrap">
          <h2 className="hp-section-h">Frequently asked questions</h2>
          <div className="hp-faq-cat">General</div>
          <div className="hp-faq-list">
            <FAQItem q="What platforms does Civic Lens monitor?" a="Facebook, Twitter/X, YouTube, TikTok, Instagram, Telegram, VK, Rumble, and more — all from a single dashboard." />
            <FAQItem q="How often is data updated?" a="Channels are updated daily with new content. High-priority channels can be updated more frequently upon request." />
            <FAQItem q="Can I export my research data?" a="Yes. Export your research to CSV at any time, or connect via our REST API for programmatic access and custom pipelines." />
            <FAQItem q="Who is eligible to use Civic Lens?" a="Journalists, researchers, academics, and civil society organizations working to understand and combat misinformation. We review all applications to ensure responsible use." />
            <FAQItem q="Is there a free tier?" a="Every paid plan starts with a free 14-day trial — full access to every feature, with no credit card required up front." />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="hp-wrap hp-cta-section">
        <div className="hp-cta-card">
          <div className="hp-cta-glow"></div>
          <h2 className="hp-cta-h">Ready to start your research?</h2>
          <p className="hp-cta-p">Join thousands of researchers, journalists, and analysts using Civic Lens to understand social media at scale.</p>
          <div className="hp-cta-btns">
            <button className="hp-btn-dark" onClick={goPlans}>Get Started Free</button>
            <button className="hp-btn-outline">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hp-footer">
        <div className="hp-wrap">
          <div className="hp-footer-top">
            <div>
              <div className="hp-logo">Civic Lens</div>
              <div className="hp-footer-dev">Developed by the <a className="hp-footer-devlink" href="#">Algorithmic Transparency Institute</a></div>
            </div>
            <div className="hp-footer-cols">
              <div className="hp-footer-col">
                <div className="hp-footer-col-h">Product</div>
                <a className="hp-footer-link" href="#features">Features</a>
                <a className="hp-footer-link" href="#pricing">Pricing</a>
                <a className="hp-footer-link" href="#faq">FAQ</a>
              </div>
              <div className="hp-footer-col">
                <div className="hp-footer-col-h">Company</div>
                <a className="hp-footer-link" href="#">About ATI</a>
                <a className="hp-footer-link" href="#">Contact</a>
              </div>
              <div className="hp-footer-col">
                <div className="hp-footer-col-h">Legal</div>
                <a className="hp-footer-link" href="#">Privacy Policy</a>
                <a className="hp-footer-link" href="#">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="hp-footer-bottom">© 2026 Algorithmic Transparency Institute. All rights reserved.</div>
        </div>
      </footer>
    </div>);

}

window.HomePage = HomePage;
