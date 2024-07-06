export const BASE_URL = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async () => {
    const response = await fetch(`${BASE_URL}/dogs`);
    if (!response.ok) {
      throw new Error("HTTP failed with status code of ${res.status}");
    }
    return response.json();
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
    if (!response.ok) {
      throw new Error("HTTP failed with status code of ${res.status}");
    }
    return response.json();
  },

  // should delete a dog from the database
  deleteDog: async (id) => {
    const response = await fetch(`${BASE_URL}/dogs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("HTTP failed with status code of ${res.status}");
    }
    return response.json();
  },

  updateDog: async (dog) => {
    const response = await fetch(`${BASE_URL}/dogs/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
    if (!response.ok) {
      throw new Error("HTTP failed with status code of ${res.status}");
    }
    return response.json();
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
