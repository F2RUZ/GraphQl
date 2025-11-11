import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const ADD_CAR = gql`
  mutation AddCar(
    $name: String!
    $type: String!
    $maxSpeed: String!
    $image: String!
    $score: String!
  ) {
    createCar(
      name: $name
      type: $type
      maxSpeed: $maxSpeed
      image: $image
      score: $score
    ) {
      id
      name
      type
      maxSpeed
      image
      score
    }
  }
`;

const AddModal = ({ setAddModal, GET_CARS }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    maxSpeed: "",
    image: "",
    score: "",
  });

  const [addCar, { loading }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_CARS }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCar({
        variables: {
          name: formData.name,
          type: formData.type,
          maxSpeed: formData.maxSpeed.toString(),
          image: formData.image || "https://via.placeholder.com/150",
          score: formData.score.toString(),
        },
      });

      setAddModal(false);
    } catch (err) {
      console.error("❌ Add error:", err);
      alert("Xatolik yuz berdi. Konsolni tekshiring.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[420px] space-y-3"
      >
        <h2 className="text-xl font-semibold text-center">Add Car</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="number"
          name="maxSpeed"
          placeholder="Max Speed"
          value={formData.maxSpeed}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          name="score"
          placeholder="Score"
          value={formData.score}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setAddModal(false)}
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
