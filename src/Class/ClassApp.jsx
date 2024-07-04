import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import toast from "react-hot-toast";
import { Requests } from "../api";

export class ClassApp extends Component {
  state = {
    dogs: [],
    activeTab: "all",
    isLoading: true,
  };

  componentDidMount() {
    Requests.getAllDogs().then((data) => {
      this.setState({ dogs: data, isLoading: false });
    });
  }

  handleFavoriteToggle = async (id, isFavorite) => {
    this.setState({ isLoading: true });
    try {
      const updatedDog = await Requests.updateDog({
        id,
        isFavorite: !isFavorite,
      });
      this.setState((prevState) => ({
        dogs: prevState.dogs.map((dog) => (dog.id === id ? updatedDog : dog)),
        isLoading: false,
      }));
    } catch (error) {
      toast.error("Error updating dog");
      this.setState({ isLoading: false });
    }
  };

  handleDelete = async (id) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(id);
      this.setState((prevState) => ({
        dogs: prevState.dogs.filter((dog) => dog.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      toast.error("Error deleting dog");
      this.setState({ isLoading: false });
    }
  };

  setActiveTab = (tab) => {
    this.setState((prevState) => ({
      activeTab: prevState.activeTab === tab ? "all" : tab,
    }));
  };

  filteredDogs = () => {
    const { dogs, activeTab } = this.state;
    if (activeTab === "favorited") {
      return dogs.filter((dog) => dog.isFavorite);
    } else if (activeTab === "unfavorited") {
      return dogs.filter((dog) => !dog.isFavorite);
    }
    return dogs;
  };

  render() {
    const { activeTab, dogs, isLoading } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
          dogs={dogs}
        >
          <div className="content-container">
            {activeTab === "create" ? (
              <ClassCreateDogForm />
            ) : (
              <ClassDogs
                dogs={this.filteredDogs()}
                isLoading={isLoading}
                onFavoriteToggle={this.handleFavoriteToggle}
                onDelete={this.handleDelete}
              />
            )}
          </div>
        </ClassSection>
      </div>
    );
  }
}
