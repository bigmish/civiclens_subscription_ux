// monitor-app.jsx — faithful recreation of the Civic Lens "Monitoring" app
// screen (Primer design system), used as the backdrop for trial-welcome
// treatments. Accepts: topBanner, sidebarCard, overlay (absolute layer).
// Exports MonitorApp to window.

const MA_POSTS = [
  {
    name: 'The Young Turks', followers: '5.8M followers', ago: '5 days ago', platform: 'youtube',
    text: "They're doing it again. Another policy that will destroy American families while elites profit.",
    eng: { views: '470.7K', likes: '36.2K', shares: '1.6K', comments: '1.9K' },
  },
  {
    name: 'Breitbart News', followers: '4.5M followers', ago: '5 days ago', platform: 'facebook',
    text: 'Deep state operatives have been caught coordinating with media to suppress this story.',
    eng: { views: '1M', likes: '27.8K', shares: '9.5K', comments: '3.3K' },
  },
  {
    name: 'Marjorie Taylor Greene', followers: '3.8M followers', ago: '6 days ago', platform: 'twitter',
    text: 'The mainstream narrative is collapsing as more evidence comes to light. Share widely.',
    eng: { views: '953.2K', likes: '32.9K', shares: '3.7K', comments: '1.1K' },
  },
  {
    name: 'Russell Brand', followers: '6.7M followers', ago: '6 days ago', platform: 'youtube',
    text: "Fact: The data on this has been manipulated. Here's the original unedited version.",
    video: true,
    eng: { views: '1.4M', likes: '42.3K', shares: '7.1K', comments: '7.6K' },
  },
];

// ── tiny icon set (simple, utilitarian) ───────────────────────────
const MAi = {
  chevron: (d) => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={d === 'up' ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'} stroke="#57606a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  monitor: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.4" stroke={c} strokeWidth="1.3" />
      <path d="M6 14h4M8 11.5V14" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  list: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 4h8M5.5 8h8M5.5 12h8" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="2.5" cy="4" r="1" fill={c} /><circle cx="2.5" cy="8" r="1" fill={c} /><circle cx="2.5" cy="12" r="1" fill={c} />
    </svg>
  ),
  antenna: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="6" r="1.4" fill={c} />
      <path d="M5 9a4 4 0 0 1 0-6M11 3a4 4 0 0 1 0 6M8 7.3l-1.4 6.2h2.8L8 7.3z" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  tag: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 2.5h5l6 6-5 5-6-6v-5z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="5.2" cy="5.2" r="1" fill={c} />
    </svg>
  ),
  people: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5.5" r="2.2" stroke={c} strokeWidth="1.3" />
      <path d="M2.5 13c0-2 1.6-3.3 3.5-3.3S9.5 11 9.5 13" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10.5 4.2A2 2 0 0 1 12 7.7M11.2 9.9c1.5.2 2.6 1.4 2.6 3.1" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  eye: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" stroke={c} strokeWidth="1.3" />
      <circle cx="8" cy="8" r="1.8" stroke={c} strokeWidth="1.3" />
    </svg>
  ),
  gear: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.1" stroke={c} strokeWidth="1.3" />
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  building: (c) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.5" y="2" width="7" height="12" rx="0.6" stroke={c} strokeWidth="1.3" />
      <path d="M9.5 6h4v8h-4" stroke={c} strokeWidth="1.3" />
      <path d="M4.5 4.5h1M6.5 4.5h1M4.5 7h1M6.5 7h1M4.5 9.5h1M6.5 9.5h1M11 8.5h1M11 11h1" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  aperture: (c) => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke={c} strokeWidth="1.3" />
      <path d="M8 2.2 5 7.3M13.5 6.2 7.6 6.6M11 13.6 8.5 8.3M2.5 9.8l5.9-.4M4.9 2.4 8 7.7" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  help: (c) => (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.3" stroke={c} strokeWidth="1.3" />
      <path d="M6.3 6.2a1.8 1.8 0 0 1 3.5.5c0 1.2-1.3 1.4-1.3 2.4" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8.4" cy="11.3" r="0.8" fill={c} />
    </svg>
  ),
  funnel: (c) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 3.5h12l-4.6 5.3V13L6.6 11.7V8.8L2 3.5z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  cal: (c) => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1.4" stroke={c} strokeWidth="1.3" />
      <path d="M2 6h12M5 1.6v2.4M11 1.6v2.4" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  engEye: (c) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.8 8 3.8 14.5 8 14.5 8 12 12.2 8 12.2 1.5 8 1.5 8z" stroke={c} strokeWidth="1.2"/><circle cx="8" cy="8" r="1.7" stroke={c} strokeWidth="1.2"/></svg>),
  heart: (c) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 13.2S2 9.8 2 5.9A2.9 2.9 0 0 1 8 4.6 2.9 2.9 0 0 1 14 5.9c0 3.9-6 7.3-6 7.3z" stroke={c} strokeWidth="1.2" strokeLinejoin="round"/></svg>),
  share: (c) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="2" stroke={c} strokeWidth="1.2"/><circle cx="12" cy="3.5" r="2" stroke={c} strokeWidth="1.2"/><circle cx="12" cy="12.5" r="2" stroke={c} strokeWidth="1.2"/><path d="M5.8 7l4.4-2.4M5.8 9l4.4 2.4" stroke={c} strokeWidth="1.2"/></svg>),
  comment: (c) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3.5h12v8H6l-3 2.3V11.5H2v-8z" stroke={c} strokeWidth="1.2" strokeLinejoin="round"/></svg>),
};

function MAPlatform({ p }) {
  if (p === 'youtube') return (
    <span className="ma-plat" style={{ background: '#ff0000' }}>
      <span style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '7px solid #fff', marginLeft: 1 }}></span>
    </span>
  );
  if (p === 'facebook') return (<span className="ma-plat" style={{ background: '#1877f2', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 13 }}>f</span>);
  return (<span className="ma-plat" style={{ background: '#000', fontWeight: 700, fontSize: 11, fontFamily: 'Arial' }}>𝕏</span>);
}

function MANavItem({ icon, label, active, chevron }) {
  const c = active ? '#0550ae' : '#57606a';
  return (
    <div className={active ? 'ma-nav-item ma-nav-active' : 'ma-nav-item'}>
      <span className="ma-nav-ic">{icon(c)}</span>
      <span className="ma-nav-label">{label}</span>
      {chevron && <span className="ma-nav-chev">{MAi.chevron(chevron)}</span>}
    </div>
  );
}

function MAPostCard({ post }) {
  const g = '#57606a';
  return (
    <div className="ma-card">
      <div className="ma-card-head">
        <div className="ma-avatar"></div>
        <div className="ma-card-id">
          <div className="ma-card-name">{post.name}</div>
          <div className="ma-card-meta">{post.followers}</div>
          <div className="ma-card-meta">{post.ago}</div>
        </div>
        <div className="ma-card-actions">
          <span className="ma-dots">···</span>
          <MAPlatform p={post.platform} />
        </div>
      </div>
      <div className="ma-card-divider"></div>
      <div className="ma-card-body">
        <p className="ma-card-text">{post.text}</p>
        {post.video && (
          <div className="ma-video">
            <span className="ma-video-ph">video thumbnail</span>
            <span className="ma-play"><span className="ma-play-tri"></span></span>
          </div>
        )}
      </div>
      <div className="ma-card-eng">
        <span className="ma-eng">{MAi.engEye(g)} {post.eng.views}</span>
        <span className="ma-eng">{MAi.heart(g)} {post.eng.likes}</span>
        <span className="ma-eng">{MAi.share(g)} {post.eng.shares}</span>
        <span className="ma-eng">{MAi.comment(g)} {post.eng.comments}</span>
      </div>
    </div>
  );
}

function MonitorApp({ topBanner, sidebarCard, overlay, orgName = 'Acme Newsroom' }) {
  return (
    <div className="ma-app">
      <div className="ma-accentline"></div>
      <div className="ma-topbar">
        <div className="ma-org">
          <span className="ma-org-ic">{MAi.aperture('#24292f')}</span>
          <span className="ma-org-name">{orgName}</span>
          <span className="ma-org-sep">/ All Projects</span>
          <span className="ma-org-section">Monitoring</span>
        </div>
        <div className="ma-topright">
          <span className="ma-icon-btn">{MAi.help('#57606a')}</span>
          <span className="ma-user"></span>
        </div>
      </div>

      <div className="ma-body">
        <aside className="ma-sidebar">
          <div className="ma-nav-group">
            <MANavItem icon={MAi.monitor} label="Monitor" chevron="up" />
            <div className="ma-nav-children">
              <MANavItem icon={MAi.list} label="Posts" active />
              <MANavItem icon={MAi.antenna} label="Channels" />
              <MANavItem icon={MAi.tag} label="Search Terms" />
              <MANavItem icon={MAi.people} label="Actors" />
              <MANavItem icon={MAi.list} label="Lists" />
            </div>
          </div>
          <MANavItem icon={MAi.eye} label="Investigate" chevron="down" />
          <MANavItem icon={MAi.gear} label="Manage" chevron="down" />
          <MANavItem icon={MAi.building} label="Organization Settings" chevron="down" />
          {sidebarCard}
        </aside>

        <main className="ma-main">
          {topBanner}
          <div className="ma-toolbar">
            <div className="ma-search">Search posts by keyword…</div>
            <div className="ma-filters">{MAi.funnel('#57606a')} Filters <span className="ma-caret">▾</span></div>
            <div className="ma-toolbar-right">
              <div className="ma-datebtn">{MAi.cal('#57606a')} Last 7 days</div>
              <div className="ma-seg">
                <span className="ma-seg-btn ma-seg-active">▦</span>
                <span className="ma-seg-btn">📈</span>
                <span className="ma-seg-btn">🏷</span>
              </div>
            </div>
          </div>
          <div className="ma-totals">
            <div className="ma-totals-l">Total Posts: <span className="ma-badge">4</span></div>
            <div className="ma-sort">Sort: Newest ↓ <span className="ma-caret">▾</span></div>
          </div>
          <div className="ma-scroll">
            <div className="ma-grid">
              {MA_POSTS.map((p, i) => <MAPostCard post={p} key={i} />)}
            </div>
            <div className="ma-nomore">No more posts to load</div>
          </div>
        </main>
      </div>

      {overlay}
    </div>
  );
}

// Sidebar-only slice — the left rail with nav + a card slot, for compact
// side-by-side comparisons of the trial card.
function MonitorSidebar({ sidebarCard }) {
  return (
    <aside className="ma-sidebar" style={{ width: '100%', height: '100%' }}>
      <div className="ma-nav-group">
        <MANavItem icon={MAi.monitor} label="Monitor" chevron="up" />
        <div className="ma-nav-children">
          <MANavItem icon={MAi.list} label="Posts" active />
          <MANavItem icon={MAi.antenna} label="Channels" />
          <MANavItem icon={MAi.tag} label="Search Terms" />
          <MANavItem icon={MAi.people} label="Actors" />
          <MANavItem icon={MAi.list} label="Lists" />
        </div>
      </div>
      <MANavItem icon={MAi.eye} label="Investigate" chevron="down" />
      <MANavItem icon={MAi.gear} label="Manage" chevron="down" />
      <MANavItem icon={MAi.building} label="Organization Settings" chevron="down" />
      {sidebarCard}
    </aside>
  );
}

window.MonitorApp = MonitorApp;
window.MonitorSidebar = MonitorSidebar;
