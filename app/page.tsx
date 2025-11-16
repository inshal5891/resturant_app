import { HomePage } from "./pages/HomePage";

export default function Page() {
  // app/page.tsx should render the root page content.
  // Routing in the Next.js App Router is file-system based; remove react-router usage.
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HomePage />
      </main>
    </div>
  );
}
