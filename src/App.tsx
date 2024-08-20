import React, { useState, useCallback } from "react";
import useFetch from "./useFetch";
import Button from "./Button";

type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { street: string };
  phone: string;
};

const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  const { data, loading, error } = useFetch<UserType>(
    userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : ""
  );

  const fetchRandomUser = useCallback(() => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    setUserId(randomId);
  }, []);

  return (
    <div>
      <h1>Fetch Random User</h1>
      <Button onClick={fetchRandomUser} text="Fetch User" />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>User Info</h2>
          <p>Name: {data.name}</p>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>Address: {data.address.street}, </p>
          <p>Phone: {data.phone}</p>
        </div>
      )}
    </div>
  );
};

export default App;
