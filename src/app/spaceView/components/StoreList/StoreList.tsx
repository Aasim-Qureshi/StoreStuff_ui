import { type FC } from "react";
import StoreItem from "../StoreItem/StoreItem";
import styles from "./StoreList.module.css";

type Item = {
  id: string;
  name: string;
  isFolder: boolean;
};

const dummyItems: Item[] = [
  { id: "1", name: "Documents", isFolder: true },
  { id: "2", name: "Resume.pdf", isFolder: false },
  { id: "3", name: "Photos", isFolder: true },
  { id: "4", name: "Invoice.xlsx", isFolder: false },
  { id: "5", name: "Music", isFolder: true },
  { id: "6", name: "Presentation.pptx", isFolder: false },
];

const StoreList: FC = () => {
  const handleItemClick = (item: Item) => {
    alert(`${item.isFolder ? "Opening folder" : "Opening file"}: ${item.name}`);
  };

  return (
    <div className={styles.storeList}>
      <div className={styles.header}>
        <span className={styles.colName}>Name</span>
        <span className={styles.colActions}>Actions</span>
      </div>
      {dummyItems.map(item => (
        <StoreItem
          key={item.id}
          name={item.name}
          isFolder={item.isFolder}
          onClick={() => handleItemClick(item)}
          onEdit={() => alert(`Renaming ${item.name}`)}
          onDownload={() => !item.isFolder && alert(`Downloading ${item.name}`)}
          onDelete={() => alert(`Deleting ${item.name}`)}
        />
      ))}
    </div>
  );
};

export default StoreList;
