(function () {
  if (localStorage.getItem('cl_auth') === '1') return;

  var overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:99999',
    'background:rgba(15,20,28,0.72)', 'backdrop-filter:blur(6px)',
    'display:flex', 'align-items:center', 'justify-content:center',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif',
  ].join(';');

  var card = document.createElement('div');
  card.style.cssText = [
    'background:#fff', 'border-radius:12px',
    'padding:40px 44px 36px', 'width:360px', 'max-width:92vw',
    'box-shadow:0 24px 64px rgba(0,0,0,0.4)', 'text-align:center',
  ].join(';');

  card.innerHTML = [
    '<div style="font-size:19px;font-weight:700;letter-spacing:-0.01em;margin-bottom:8px;">Civic Lens</div>',
    '<p style="font-size:14px;color:#57606a;margin:0 0 28px;">Enter the password to view these prototypes.</p>',
    '<input id="cl-pw" type="password" placeholder="Password" autocomplete="current-password"',
    '  style="width:100%;border:1px solid #d0d7de;border-radius:7px;padding:10px 13px;',
    '         font-size:15px;font-family:inherit;outline:none;box-sizing:border-box;',
    '         transition:border-color 0.15s;" />',
    '<div id="cl-err" style="font-size:13px;color:#cf222e;margin:8px 0 0;min-height:18px;"></div>',
    '<button id="cl-go"',
    '  style="margin-top:8px;width:100%;background:#1f2328;color:#fff;border:none;',
    '         border-radius:7px;padding:12px;font-size:15px;font-weight:600;',
    '         font-family:inherit;cursor:pointer;">',
    '  Enter',
    '</button>',
  ].join('');

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  var input = document.getElementById('cl-pw');
  var err = document.getElementById('cl-err');
  var btn = document.getElementById('cl-go');

  input.focus();
  input.style.borderColor = '#d0d7de';

  input.addEventListener('focus', function () {
    input.style.borderColor = '#0969da';
    input.style.boxShadow = '0 0 0 3px rgba(9,105,218,0.12)';
  });
  input.addEventListener('blur', function () {
    input.style.borderColor = '#d0d7de';
    input.style.boxShadow = 'none';
  });

  function attempt() {
    if (input.value === '4civiclens') {
      localStorage.setItem('cl_auth', '1');
      overlay.remove();
    } else {
      err.textContent = 'Incorrect password.';
      input.value = '';
      input.focus();
      input.style.borderColor = '#cf222e';
      input.style.boxShadow = '0 0 0 3px rgba(207,34,46,0.12)';
    }
  }

  btn.addEventListener('click', attempt);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(); });
})();
