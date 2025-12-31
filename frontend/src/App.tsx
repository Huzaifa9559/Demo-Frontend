import { Toaster } from "sonner";
import { AppRouter } from "@routes";
import { useEffect, useState } from "react";
import { ReactQueryProvider } from "@providers";
import { Provider } from "react-redux";
import { store } from "@/store";

async function enableMocking() {
  // Only enable mocking if explicitly enabled via env variable
  const shouldEnableMocking = import.meta.env.VITE_ENABLE_MOCKING === "true";
  
  if (shouldEnableMocking) {
    const { worker } = await import("@mocks");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
  
  // If mocking is disabled, resolve immediately
  return Promise.resolve();
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Initializing application...</div>
  </div>
);

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    enableMocking()
      .then(() => {
        setIsReady(true);
      })
      .catch((error) => {
        console.error("Failed to initialize mocking:", error);
        setIsReady(true); // Continue even if mocking fails
      });
  }, []);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <Toaster position="top-right" />
        <AppRouter />
      </ReactQueryProvider>
    </Provider>
  );
}

export default App;
