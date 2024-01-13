import ReactDOM from "react-dom/client";
import "@/shared/styles/index.scss";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./appRouter.tsx";
import { Provider } from "react-redux";
import { store } from "./appStore.ts";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={appRouter()} />
    <Toaster position="top-right" richColors closeButton />
  </Provider>
);
