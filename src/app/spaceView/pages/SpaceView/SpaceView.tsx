import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { deleteFile, editFilename, editFolderName, getChildrenFolders, downloadFile, createFolder, uploadFile, getFolderById, deleteFolder, sendInvite } from "../../api";
import StoreItem from "../../components/StoreItem/StoreItem";
import styles from "./SpaceView.module.css"; // Reusing StoreList CSS
import FloatingButtons from "../../components/FloatingButtons/FloatingButtons";
import Navbar from "../../../../shared/components/Navbar/Navbar";


const SpaceView = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [folderPath, setFolderPath] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const location = useLocation();
  const spaceName = location.state?.spaceName;

  console.log(spaceId)

  const fetchChildren = async () => {
    console.log(spaceName)
    if (!spaceId) return;
    console.log("folderId", folderId);
    console.log("folderPath", folderPath);
    try {
      const res: any = await getChildrenFolders(spaceId, folderId);
      setFolders(res.data?.folders ?? []);
      setFiles(res.data?.files ?? []);
      console.log("Fetched folders:", res.data?.folders);

      console.log("Fetched files:", res.data?.files);

    } catch (err) {
      console.error("Failed to fetch folders/files", err);
    }
  };
  useEffect(() => {
    fetchChildren();
  }, [spaceId, folderId]);

  const handleFolderClick = (folder: any) => {
    if (folder.isFolder === false) return;
    console.log("Folder clicked:", folder);
    setFolderId(folder.id);
    setFolderPath(folder.path);
    setParentId(folder.parentId || null);
  }

  const handleAddFolder = async () => {
    console.log("Button Clicked")
    const folderName = prompt("Enter folder name:");
    if (!folderName) return;
    try {

      const adjustedFolderPath = folderPath || `spaces/${spaceName}`
      const newFolder: any = await createFolder(folderName, spaceId, adjustedFolderPath);
      console.log("New folder created:", newFolder.data);
      setFolders((prev) => [...prev, newFolder.data]);
    } catch (err) {
      console.error("Failed to create folder", err);
    }
  }

  const handleUploadFile = async () => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !spaceId || !spaceName) return;

      try {
        const cloudPath = folderPath || `spaces/${spaceName}`;
        const fileType = file.type || "application/octet-stream"; // fallback for unknown types

        const uploaded: any = await uploadFile({
          file,
          spaceId,
          folderId, 
          name: file.name,
          type: fileType,
          cloudPath,
        });

        console.log("Uploaded file:", uploaded);
        setFiles((prev) => [...prev, uploaded.data]); 
      } catch (err) {
        console.error("Upload failed", err);
        alert("Failed to upload file");
      }
    };

    input.click();
  };

  const handleGoBack = async () => {
    if (!folderPath && !folderId) return;

    const newFolderId = parentId ?? null;
    setFolderId(newFolderId);

    // Adjust folderPath
    if (folderPath) {
      const parts = folderPath.split('/');
      parts.pop(); // remove current folder name
      const newPath = parts.join('/');
      setFolderPath(newPath === "spaces" ? null : newPath);
    }

    // Update parentId of the new folderId
    if (newFolderId) {
      try {
        const res: any = await getFolderById(newFolderId);
        setParentId(res.data?.parentId ?? null);
      } catch (err) {
        console.error("Failed to fetch parent folder info", err);
        setParentId(null);
      }
    } else {
      setParentId(null);
    }
  };



  const allItems = [
    ...folders.map((folder) => ({
      id: folder.folderId,
      name: folder.name,
      isFolder: true,
      path: folder.folderPath,
      parentId: folder.parentId || null,
    })),
    ...files.map((file) => ({
      id: file.fileId,
      name: file.name,
      isFolder: false,
      publicId: file.publicId,
    })),
  ];


  const handleDelete = async (item: any) => {

    try {

      if (item.isFolder) {
        alert(`Deleting folder: ${item.name}`);
        // Call delete folder API here
        const response: any = await deleteFolder(item.id);
        console.log("Folder deleted:", response);
        setFolders((prev) => prev.filter((folder) => folder.folderId !== item.id));
      } else {
        alert(`Deleting file: ${item.name}`);
        const response = await deleteFile(item.id);
        console.log("File deleted:", response);
        setFiles((prev) => prev.filter((file) => file.fileId !== item.id));
      }
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  }

  const handleEdit = async (item: any) => {
    const name = prompt(`Enter new name for ${item.name}:`);
    if (!name) return;

    if(item.isFolder) {
      const response: any = await editFolderName(item.id, name);
      console.log("Folder renamed:", response);
      setFolders((prev) =>
        prev.map((folder) => (folder.folderId === item.id ? { ...folder,  name: response.data.name } : folder))
      );
      return;
    }
    const response: any = await editFilename(item.id, name);
    console.log("File renamed:", response);
    setFiles((prev) =>
      prev.map((file) => (file.fileId === item.id ? { ...file, name: response.data.name } : file))
    );
  };

  const handleDownload = async (item: any) => {
  if (item.isFolder) {
    alert("Cannot download a folder. Please select a file.");
    return;
  }

  try {
    const blob: any = await downloadFile(item.publicId); 

    // Create a temporary object URL for the blob
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // Set the filename (optional but better for UX)
    link.download = item.name || "download";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // release blob memory
  } catch (error) {
    console.error("Failed to download file", error);
  }
}; 

  const handleSendInvite = async (email: string) => {
  if (!email || !spaceId) return;
  try {
    await sendInvite(email, spaceId);
    alert(`Invitation sent to ${email}`);
  } catch (err) {
    console.error("Failed to send invite", err);
    alert("Failed to send invitation");
  }
};


  return (
    <div className={styles.mainContainer}>
      <Navbar searchType='insideSpace'  onSearch={() => {}} onInvite={handleSendInvite}/>
      <div className={styles.spaceViewContainer}>
    <div className={styles.storeList}>
      {(folderId || folderPath) && (
        <button onClick={handleGoBack} className={styles.backButton}>
          ← Back
        </button>
      )}

      {allItems.length === 0 ? (
        <p style={{ padding: "24px", color: "#888", fontStyle: "italic" }}>This folder is empty.</p>
      ) : (
        allItems.map((item) => (
          <StoreItem
            key={item.id}
            name={item.name}
            isFolder={item.isFolder}
            onClick={() => handleFolderClick(item)}
            onEdit={() => handleEdit(item)}
            onDownload={() => handleDownload(item)}
            onDelete={() => handleDelete(item)}
          />
        ))
      )}
      <FloatingButtons handleAddFolder={handleAddFolder} handleUploadFile={handleUploadFile} />
    </div>
      </div>
    </div>
  );
};

export default SpaceView;
