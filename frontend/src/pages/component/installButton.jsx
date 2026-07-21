import { useEffect, useState } from "react";

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <button onClick={install} style={{fontSize: "16px",
    color: "white",
    padding: "8px",
    width: "132px",
    border: "2px dashed green",
    borderRadius: "20px",
    background:"red",
    fontWeight:"bold"}}>
      Install App
    </button>
  );
}

export default InstallButton;