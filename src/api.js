export const BASE_URL = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async () => {
    const response = await fetch(`${BASE_URL}/dogs`);
    const data = await response.json();
    return data;
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (dog) => {
    const response = await fetch(`${BASE_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
    const data = await response.json();
    return data;
  },

  // should delete a dog from the database
  deleteDog: async (id) => {
    await fetch(`${BASE_URL}/dogs/${id}`, {
      method: "DELETE",
    });
  },

  updateDog: async (dog) => {
    const response = await fetch(`${BASE_URL}/dogs/${dog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
    const data = await response.json();
    return data;
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
