import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component {
  state = {
    name: "",
    description: "",
    picture: defaultSelectedImage,
  };

  resetStateForm = () => {
    this.setState({
      name: "",
      description: "",
      picture: defaultSelectedImage,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, picture } = this.state;
    const newDog = {
      name,
      description,
      image: picture,
      isFavorite: false,
    };

    this.props
      .addDog(newDog)
      .then(() => {
        this.resetStateForm();
        toast.success("Dog Created");
      })
      .catch(() => {
        toast.error("Failed to add a dog");
      });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isLoading } = this.props;
    const { name, description, picture } = this.state;

    return (
      <form id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleInputChange}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          value={description}
          onChange={this.handleInputChange}
          cols={80}
          rows={10}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          name="picture"
          value={picture}
          onChange={this.handleInputChange}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          ))}
        </select>
        <input type="submit" value="Create" disabled={isLoading} />
      </form>
    );
  }
}
