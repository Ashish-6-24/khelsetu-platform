// Zero-flash theme bootstrap. Runs synchronously before React mounts.
(function () {
  try {
    var stored = localStorage.getItem('khelsetu-theme');
    var theme =
      stored === 'light' || stored === 'dark' || stored === 'system'
        ? stored
        : 'system';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = theme === 'dark' || (theme === 'system' && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (_) {
    /* localStorage may be blocked; fall through to system */
  }
})();
