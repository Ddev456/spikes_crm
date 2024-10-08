import "./Loader.css"; // Assurez-vous d'avoir un fichier CSS pour styliser le loader

const Loader = () => {
  return (
    <div className="loader-container">
      <img src="/logo_bg.svg" className="loader-logo" alt="Loading..." />
      <div className="loader-text font-semibold">Loading...</div>
    </div>
  );
};

export default Loader;
