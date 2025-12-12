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

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    enableMocking().then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return null; // or a loading spinner
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
