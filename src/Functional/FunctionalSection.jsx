import { Link } from "react-router-dom";

export const FunctionalSection = ({
  activeTab,
  setActiveTab,
  counters,
  children,
}) => {
  const handleTabClick = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? "all" : tab));
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => handleTabClick("favorited")}
          >
            favorited ({counters.favorited})
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => handleTabClick("unfavorited")}
          >
            unfavorited ({counters.unfavorited})
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => handleTabClick("create")}
          >
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
