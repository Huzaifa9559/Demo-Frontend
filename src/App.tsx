import { Toaster } from "sonner";
import { AppRouter } from "@routes";
import { useEffect, useState } from "react";
import { ReactQueryProvider } from "@providers";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("@mocks");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

function App() {
  const [isMockingEnabled, setIsMockingEnabled] = useState(false);

  useEffect(() => {
    enableMocking().then(() => {
      setIsMockingEnabled(true);
    });
  }, []);

  if (!isMockingEnabled) {
    return null; // or a loading spinner
  }

  return (
    <ReactQueryProvider>
      <Toaster position="top-right" />
      <AppRouter />
    </ReactQueryProvider>
  );
}

export default App;
