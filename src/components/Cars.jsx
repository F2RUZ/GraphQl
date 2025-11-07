import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import EditModal from "./EditModal";

const GET_CARS = gql`
  query {
    allCars {
      id
      name
      type
      score
      maxSpeed
      image
    }
  }
`;

const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;

const Cars = () => {
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(0);

  const { data, loading, error } = useQuery(GET_CARS);
  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_CARS }],
  });

  const handleDelete = (id) => {
    if (window.confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
      deleteCar({ variables: { id } });
    }
  };

  //handle<odal

  const handleModal = () => {
    setModal(true);
  };

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi 😢</p>;

  return (
    <div className="p-5">
      {modal ? (
        <EditModal editId={editId} setModal={setModal} GET_CARS={GET_CARS} />
      ) : null}
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Max Speed</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.allCars?.map((item, index) => (
            <tr key={item.id} className="text-center hover:bg-gray-100">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.type}</td>
              <td className="p-2 border">{item.maxSpeed}</td>
              <td className="p-2 border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mx-auto"
                />
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleModal();
                    setEditId(item.id);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cars;
