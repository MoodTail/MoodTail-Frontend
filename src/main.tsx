import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SharedMonthlyReportPage from "./pages/HistoryPage/SharedMonthlyReportPage.tsx";

const sharedMonthlyReportMatch = window.location.pathname.match(
  /^\/reports\/monthly\/share\/([^/]+)\/?$/,
);
const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    {sharedMonthlyReportMatch ? (
      <SharedMonthlyReportPage shareToken={decodeURIComponent(sharedMonthlyReportMatch[1])} />
    ) : (
      <App />
    )}
  </StrictMode>,
);
