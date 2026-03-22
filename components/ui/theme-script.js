export function ThemeScript() {
  const script = `(() => {
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (systemDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
