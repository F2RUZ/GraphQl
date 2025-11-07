import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: ID!
    $name: String!
    $type: String!
    $maxSpeed: String!
    $image: String!
  ) {
    updateCar(
      id: $id
      name: $name
      type: $type
      maxSpeed: $maxSpeed
      image: $image
    ) {
      id
      name
      type
      image
      maxSpeed
    }
  }
`;

const EditModal = ({ setModal, editId, GET_CARS }) => {
  const [formData, setFormData] = useState({
    name: "",
    score: 0,
    type: "",
    maxSpeed: 0,
    image: "",
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_CARS }],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar({
        variables: {
          id: editId,
          name: formData.name,
          type: formData.type,
          maxSpeed: formData.maxSpeed.toString(),
          image: formData.image,
        },
      });

      alert("✅ Car updated successfully!");
      setModal(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Xatolik yuz berdi!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-3"
      >
        <h2 className="text-xl font-semibold text-center">Edit Car</h2>

        <input
          onChange={handleChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          onChange={handleChange}
          value={formData.type}
          type="text"
          name="type"
          placeholder="Type"
          className="w-full border p-2 rounded"
        />
        <input
          onChange={handleChange}
          value={formData.maxSpeed}
          type="number"
          placeholder="Max Speed"
          name="maxSpeed"
          className="w-full border p-2 rounded"
        />
        <input
          value={formData.image}
          onChange={handleChange}
          type="url"
          placeholder="Image URL"
          name="image"
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setModal(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
