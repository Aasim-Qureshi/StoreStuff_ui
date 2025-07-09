import { UploadCloud, FolderPlus } from "lucide-react";
import styles from "./FloatingButtons.module.css";


  const FloatingButtons = ({ handleAddFolder, handleUploadFile }: any) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleUploadFile} >
        <UploadCloud size={24} />
      </button>
      <button className={styles.button} onClick={handleAddFolder}>
        <FolderPlus size={24} />
      </button>
    </div>
  );
};

export default FloatingButtons;
