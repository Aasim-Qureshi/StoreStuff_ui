import React, { useEffect, useState } from "react";
import SpaceLayout from "../components/SpaceLayout/SpaceLayout";
import { getSpacesByUserId, createSpace } from "../api";
import { type Space } from "../types"; 

const Dashboard: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

async function fetchSpaces() {
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
}

  console.log("spaces", spaces);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const handleCreateSpace = async (spaceName: string) => {
    try {
      await createSpace(spaceName);
      fetchSpaces(); // Re-fetch after creation
    } catch (err: any) {
      console.error("Failed to create space", err);
      alert(err.message || "Error creating space");
    }
  };

  if (loading) return <div>Loading spaces...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <SpaceLayout
      spaces={spaces}
      onCreateSpace={handleCreateSpace}
      onSpaceUpdate={fetchSpaces}
    />
  );
};

export default Dashboard;
