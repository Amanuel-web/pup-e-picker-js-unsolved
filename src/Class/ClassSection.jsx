import { Component } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  handleTabClick = (tab) => {
    const { setActiveTab } = this.props;
    setActiveTab((prevTab) => (prevTab === tab ? "all" : tab));
  };

  render() {
    const { activeTab, dogs, children } = this.props;
    const favoritedCount = dogs.filter((dog) => dog.isFavorite).length;
    const unfavoritedCount = dogs.filter((dog) => !dog.isFavorite).length;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to="/functional" className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            <div
              className={`selector ${
                activeTab === "favorited" ? "active" : ""
              }`}
              onClick={() => this.handleTabClick("favorited")}
            >
              favorited ({favoritedCount})
            </div>
            <div
              className={`selector ${
                activeTab === "unfavorited" ? "active" : ""
              }`}
              onClick={() => this.handleTabClick("unfavorited")}
            >
              unfavorited ({unfavoritedCount})
            </div>
            <div
              className={`selector ${activeTab === "create" ? "active" : ""}`}
              onClick={() => this.handleTabClick("create")}
            >
              create dog
            </div>
          </div>
        </div>
        {children}
      </section>
    );
  }
}
