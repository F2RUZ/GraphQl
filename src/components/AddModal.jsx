// AddModal.jsx
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const ADD_CAR = gql`
  mutation AddCar(
    $id: ID!
    $name: String!
    $type: String!
    $maxSpeed: String!
    $image: String!
  ) {
    addCar(
      id: $id
      name: $name
      type: $type
      maxSpeed: $maxSpeed
      image: $image
    ) {
      id
      name
      maxSpeed
      image
      type
    }
  }
`;

const AddModal = ({ setAddModal, GET_CARS }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    maxSpeed: "",
    image: "",
  });

  const [addCar, { loading }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_CARS }], // to'g'ri format
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agar server id talab qilsa, biz hozircha uni yaratamiz. Agar server avtomatik beradi — o'chiring.
      const newId = Date.now().toString();

      await addCar({
        variables: {
          id: newId,
          name: formData.name,
          type: formData.type,
          // server maxSpeed String kutsa .toString(), agar Int kerak bo'lsa Number(...)
          maxSpeed: formData.maxSpeed.toString(),
          image: formData.image,
        },
      });

      setAddModal(false);
    } catch (err) {
      console.error("Add error:", err);
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
          value={formData.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          value={formData.type}
          onChange={handleChange}
          type="text"
          name="type"
          placeholder="Type"
          className="w-full border p-2 rounded"
          required
        />
        <input
          value={formData.maxSpeed}
          onChange={handleChange}
          type="number"
          placeholder="Max Speed"
          name="maxSpeed"
          className="w-full border p-2 rounded"
          required
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
