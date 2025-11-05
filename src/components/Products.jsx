import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";

const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      title
      price
      category
      description
      images
    }
  }
`;

const DELETE_PRODUCTS = gql`
  mutation DeleteProduc($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const Products = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCTS, {
    refetchQueries: [GET_PRODUCTS],
  });
  if (loading)
    return (
      <h1 className="text-center text-white text-2xl mt-10">Loading...</h1>
    );
  if (error)
    return (
      <h1 className="text-center text-red-500 text-2xl mt-10">
        Error fetching data 😔
      </h1>
    );

  //handleDelete

  const handleDelete = (id) => {
    if (window.confirm("are shure deleted it")) {
      deleteProduct({ variables: { id } });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8">
      <div className="w-full max-w-6xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-semibold text-white text-center mb-6 tracking-wide">
          🌌 Product List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-gray-200">
            <thead>
              <tr className="bg-white/10 backdrop-blur-sm text-sm uppercase text-gray-300 tracking-wider">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.allProducts.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/10 transition-all duration-300 border-b border-white/10"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{item.title}</td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4 line-clamp-2">{item.description}</td>
                  <td className="py-3 px-4">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-xl shadow-md border border-white/20"
                    />
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button className="px-3 py-1 bg-blue-500/80 hover:bg-blue-600/90 text-white text-sm rounded-lg shadow-lg backdrop-blur-sm transition-all">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="px-3 py-1 bg-red-500/80 hover:bg-red-600/90 text-white text-sm rounded-lg shadow-lg backdrop-blur-sm transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
