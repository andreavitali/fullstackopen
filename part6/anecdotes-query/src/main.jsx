import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsContextProvider } from "./NotificationsContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationsContextProvider>
      <App />
    </NotificationsContextProvider>
  </QueryClientProvider>
);
