import { Toaster } from "sonner";
import { AppRouter } from "@routes";
import { ApolloProviderWrapper } from "@providers";
import { Provider } from "react-redux";
import { store } from "@/store";


export const App = () => {
  return (
    <Provider store={store}>
      <ApolloProviderWrapper>
          <Toaster position="top-right" />
          <AppRouter />
      </ApolloProviderWrapper>
    </Provider>
  );
}
