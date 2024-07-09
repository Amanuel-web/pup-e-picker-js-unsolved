import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";
import { useState } from "react";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({ isLoading, addDog }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(defaultSelectedImage);

  const resetStateForm = () => {
    setName("");
    setDescription("");
    setPicture(defaultSelectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDog = {
      name,
      description,
      image: picture,
      isFavorite: false,
    };

    addDog(newDog)
      .then(() => {
        resetStateForm();
        toast.success("Dog Created");
      })
      .catch(() => {
        toast.error("Failed to add a dog");
      });
  };

  return (
    <form id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        cols={80}
        rows={10}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
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
};
