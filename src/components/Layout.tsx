import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <main className="min-h-dvh bg-cream text-cocoa">
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 py-6 sm:px-8">
        <Outlet />
      </div>
    </main>
  );
}
