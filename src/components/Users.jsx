import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";

const GET_USERS = gql`
  query {
    allUsers {
      id
      role
      email
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [GET_USERS],
  });
  if (loading)
    return (
      <h1 className="text-center text-white text-2xl mt-10 animate-pulse">
        Loading...
      </h1>
    );
  if (error)
    return (
      <h1 className="text-center text-red-500 text-2xl mt-10">
        Error fetching data 😔
      </h1>
    );

  const handleDelete = (id) => {
    deleteUser({ variables: { id } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8">
      <div className="w-full max-w-5xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-semibold text-white text-center mb-6 tracking-wide">
          👥 User List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-gray-200">
            <thead>
              <tr className="bg-white/10 backdrop-blur-sm text-sm uppercase text-gray-300 tracking-wider">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.allUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-white/10 transition-all duration-300 border-b border-white/10"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button className="px-3 py-1 bg-blue-500/80 hover:bg-blue-600/90 text-white text-sm rounded-lg shadow-lg backdrop-blur-sm transition-all">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(user.id);
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

export default Users;
