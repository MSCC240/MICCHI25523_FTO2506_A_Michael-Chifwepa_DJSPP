import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./app/ThemeContext";
import { AudioProvider } from "./app/AudioContext";
import { FavsProvider } from "./app/FavsContext";
import { PodcastProvider } from "./context/PodcastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PodcastProvider>
          <FavsProvider>
            <AudioProvider>
              <App />
            </AudioProvider>
          </FavsProvider>
        </PodcastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
