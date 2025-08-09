import './globals.css';
import Topbar from '@/components/Topbar';
export const metadata = { title: 'Emotion Dictionary', description: 'Word of the day for emotions' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Topbar />
          {children}
          <footer className="mt-10 text-[11px] text-gray-500">
            Definitions from WordNet 3.x. Affect tags from WordNet-Affect / WordNet Domains (CC BY 3.0). Attribution in /public/attribution.txt.
          </footer>
        </div>
      </body>
    </html>
  );
}
