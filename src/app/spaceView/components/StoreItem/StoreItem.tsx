import { type FC } from "react";
import { FolderIcon, FileIcon, Trash2, Pencil, Download } from "lucide-react";
import styles from "./StoreItem.module.css";

type Props = {
  name: string;
  isFolder: boolean;
  onClick?: () => void;
  onDelete?: (item: any) => void;
  onEdit?: () => void;
  onDownload?: () => void;
};

const StoreItem: FC<Props> = ({ name, isFolder, onClick, onDelete, onEdit, onDownload }) => {
  return (
    <div className={styles.itemContainer} onClick={onClick}>
      <div className={styles.leftSection}>
        {isFolder ? (
          <FolderIcon className={styles.icon} />
        ) : (
          <FileIcon className={styles.icon} />
        )}
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <Pencil className={styles.actionIcon} onClick={onEdit} />
        <Download className={styles.actionIcon} onClick={onDownload} />
        <Trash2 className={styles.actionIcon} onClick={onDelete} />
      </div>
    </div>
  );
};

export default StoreItem;
