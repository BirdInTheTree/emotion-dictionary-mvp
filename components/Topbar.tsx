export default function Topbar() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h1 className="h1">Emotion Dictionary</h1>
      <nav className="flex gap-2">
        <a className="btn-ghost" href="/">Free</a>
        <a className="btn-ghost" href="#pairs">Pairs</a>
      </nav>
    </header>
  );
}
