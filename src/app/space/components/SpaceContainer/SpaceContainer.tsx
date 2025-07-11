import React, { useState } from 'react';
import styles from './SpaceContainer.module.css';
import { type Space } from '../../types';
import { deleteSpace, updateSpaceName } from '../../api';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface SpaceContainerProps {
  space: Space;
  onSpaceUpdate: () => void;
}

const SpaceContainer: React.FC<SpaceContainerProps> = ({ space: initialSpace, onSpaceUpdate }) => {
  const [space, setSpace] = useState(initialSpace);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(initialSpace.name);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();

  const handleSpaceClick = () => {
    navigate(`/space-view/${space.spaceId}`, {
      state: { spaceName: space.name },
    });

  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${space.name}"?`)) return;

    try {
      setLoading(true);
      await deleteSpace(space.spaceId);
      setDeleted(true);
      onSpaceUpdate(); // Refresh parent state
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!newName.trim()) return;

    try {
      setLoading(true);
      await updateSpaceName(space.spaceId, newName.trim());
      setSpace({ ...space, name: newName.trim(), updatedAt: new Date().toISOString() });
      setEditMode(false);
      onSpaceUpdate(); // Refresh parent state
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRelativeTime = (date: string): string => {
    const now = new Date();
    const updated = new Date(date);
    const diffMs = now.getTime() - updated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return 'Just updated';
  };

  if (deleted) return null;

  const memberRole = space.members[0]?.roles ?? 'Member';

  return (
    <div className={styles.container} onClick={handleSpaceClick} >
      <div className={styles.header}>
        {editMode ? (
          <>
            <input
              className={styles.editInput}
              value={newName}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setNewName(e.target.value)}
              disabled={loading}
            />
            <button
              className={styles.saveBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate();
              }}
              disabled={loading}
            >
              Save
            </button>
          </>
        ) : (
          <h2 className={styles.spaceName}>{space.name}</h2>
        )}


        <div className={styles.iconButtons}>
          <FiTrash2
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
          <FiEdit3
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(!editMode);
            }}
          />
        </div>

      </div>

      <div className={styles.meta}>
        <span className={styles.updated}>{getRelativeTime(space.updatedAt)}</span>
      </div>

      <div className={styles.roleWrapper}>
        <span className={styles.roleBadge}>{memberRole}</span>
      </div>
    </div>
  );
};

export default SpaceContainer;
