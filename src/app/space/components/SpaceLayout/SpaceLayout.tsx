import SpaceList from '../SpaceList/SpaceList';
import { type Space } from '../../types';
import Navbar from '../../../../shared/components/Navbar/Navbar';
import styles from './SpaceLayout.module.css';
import CreateSpaceForm from '../CreateSpaceForm/CreateSpaceForm';

interface SpaceLayoutProps {
  spaces: Space[];
  onCreateSpace: (spaceName: string) => Promise<void>;
  onSpaceUpdate: () => void;
}

const onSearch = (searchTerm: string) => {
  console.log('Search term:', searchTerm);
};

const SpaceLayout = ({ spaces, onCreateSpace, onSpaceUpdate }: SpaceLayoutProps) => {
  return (
    <div className={styles.mainContainer}>
      <Navbar searchType='spaceDashboard' onSearch={onSearch} />
      <div className={styles.contentContainer}>
        <CreateSpaceForm onCreate={onCreateSpace} />
        {spaces.length === 0 ? (
          <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
            No spaces found. You can create a new one above.
          </div>
        ) : (
          <SpaceList spaces={spaces} onSpaceUpdate={onSpaceUpdate} />
        )}
      </div>
    </div>
  );
};

export default SpaceLayout;
