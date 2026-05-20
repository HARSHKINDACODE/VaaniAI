import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css";
import App from "./App";
import Auth from "./pages/Auth";

function Root() {
  const [route, setRoute] = useState("auth");

  return (
    <AnimatePresence mode="wait">
      {route === "auth" ? (
        <motion.div 
          key="auth" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="w-full min-h-screen bg-[var(--bg-gradient-bottom)]"
        >
          <Auth onLogin={() => setRoute("app")} />
        </motion.div>
      ) : (
        <motion.div 
          key="app" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen bg-[var(--bg-gradient-bottom)]"
        >
          <App />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);