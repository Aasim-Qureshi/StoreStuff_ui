import React, { useEffect, useState } from "react";
import SpaceLayout from "../components/SpaceLayout/SpaceLayout";
import { getSpacesByUserId, createSpace } from "../api";
import { type Space } from "../types"; 

const Dashboard: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchSpaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSpacesByUserId();
      setSpaces(response.data.data); 
    } catch (err: any) {
      setError(err.message || "Failed to load spaces");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSpace = async (spaceName: string) => {
    try {
      await createSpace(spaceName);
      fetchSpaces(); 
    } catch (err: any) {
      console.error("Failed to create space", err);
      alert(err.message || "Error creating space");
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query.toLowerCase());
  };

  const filteredSpaces = spaces.filter((space) =>
    space.name.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    fetchSpaces();
  }, []);

  if (loading) return <div>Loading spaces...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <SpaceLayout
      spaces={filteredSpaces}
      onCreateSpace={handleCreateSpace}
      onSpaceUpdate={fetchSpaces}
      onSearch={handleSearch}
    />
  );
};

export default Dashboard;
