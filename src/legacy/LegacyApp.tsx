import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const App = lazy(async () => {
  const [{ HelmetProvider }, mod] = await Promise.all([
    import("react-helmet-async"),
    import("./App"),
  ]);
  const Inner = mod.default;
  return {
    default: () => (
      <HelmetProvider>
        <Inner />
      </HelmetProvider>
    ),
  };
});

export function LegacyApp() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-background" />}>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <App />
      </Suspense>
    </ClientOnly>
  );
}
