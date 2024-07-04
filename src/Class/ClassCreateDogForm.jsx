import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component {
  state = {
    name: "",
    description: "",
    picture: defaultSelectedImage,
    isLoading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    const { name, description, picture } = this.state;
    const newDog = {
      name,
      description,
      image: picture,
      isFavorite: false,
    };

    try {
      await Requests.postDog(newDog);
      toast.success("Dog Created");
      this.setState({
        name: "",
        description: "",
        picture: defaultSelectedImage,
      });
    } catch (error) {
      toast.error("Error creating dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, description, picture, isLoading } = this.state;

    return (
      <form id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          value={description}
          onChange={this.handleChange}
          cols={80}
          rows={10}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          name="picture"
          value={picture}
          onChange={this.handleChange}
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
