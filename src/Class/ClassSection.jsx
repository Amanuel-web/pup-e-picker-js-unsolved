import { Component } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  handleTabClick = (tab) => {
    this.props.setActiveTab((prevTab) => (prevTab === tab ? "all" : tab));
  };

  render() {
    const { activeTab, counters, children } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            <div
              className={`selector ${
                activeTab === "favorited" ? "active" : ""
              }`}
              onClick={() => this.handleTabClick("favorited")}
            >
              favorited ({counters.favorited})
            </div>
            <div
              className={`selector ${
                activeTab === "unfavorited" ? "active" : ""
              }`}
              onClick={() => this.handleTabClick("unfavorited")}
            >
              unfavorited ({counters.unfavorited})
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
