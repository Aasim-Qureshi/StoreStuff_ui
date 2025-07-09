import React from 'react';
import SpaceContainer from '../SpaceContainer/SpaceContainer';
import styles from './SpaceList.module.css';
import { type Space } from '../../types';

interface SpaceListProps {
  spaces: Space[];
  onSpaceUpdate: () => void;
}



const SpaceList: React.FC<SpaceListProps> = ({ spaces, onSpaceUpdate }) => {
  return (
    <div className={styles.listContainer}>
      {spaces.map(space => (
        <SpaceContainer
          key={space.spaceId}
          space={space}
          onSpaceUpdate={onSpaceUpdate}
        />
      ))}
    </div>
  );
};

export default SpaceList;
