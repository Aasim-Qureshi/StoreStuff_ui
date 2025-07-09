import React, { useState } from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';
import { decodedToken } from '../../hooks/useToken';
import { acceptInvite, getInvitations } from '../../../app/spaceView/api';

type Invitation = {
  invitationId: string;
  recipientEmail: string;
  status: 'pending' | 'accepted' | 'rejected'; // Adjust if your backend returns other values
};

type NavbarProps = {
  searchType: 'spaceDashboard' | 'insideSpace';
  onSearch: (query: string) => void;
  onInvite?: (email: string) => void;
};

const user = decodedToken();

const Navbar: React.FC<NavbarProps> = ({
  searchType,
  onSearch,
  onInvite,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchType === 'insideSpace') {
      onInvite?.(inputValue);
    } else {
      onSearch(inputValue);
    }
    setInputValue('');
  };

  const toggleDropdown = async () => {
    setDropdownOpen((prev) => !prev);

    if (!isDropdownOpen && user?.email) {
      setLoadingInvites(true);
      try {
        const response: any = await getInvitations(user.email);
        setInvitations(response.data || []);
        console.log("Invitations fetched:", response.data);
      } catch (err) {
        console.error("Failed to fetch invitations", err);
        setInvitations([]);
      } finally {
        setLoadingInvites(false);
      }
    }
  };

  const handleAccept = (invitationId: string) => {
    const response = acceptInvite(invitationId);
    console.log("Invitation accepted:", response);
    setInvitations((prev) =>
      prev.filter((inv) => inv.invitationId !== invitationId)
    );
    alert(`Invite accepted: ${invitationId}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>YourAppLogo</div>

      <form onSubmit={handleFormSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder={
            searchType === 'spaceDashboard'
              ? 'Search spaces...'
              : 'Invite members...'
          }
          value={inputValue}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          {searchType === 'spaceDashboard' ? (
            <Search size={24} color="white" />
          ) : (
            <Plus size={24} color="white" />
          )}
        </button>
      </form>

      <div className={styles.dropdownContainer}>
        <button onClick={toggleDropdown} className={styles.dropdownToggle}>
          Invitations <ChevronDown size={16} />
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {loadingInvites ? (
              <div className={styles.dropdownItem}>Loading...</div>
            ) : invitations.filter((inv) => inv.status === 'pending').length > 0 ? (
              invitations
                .filter((inv) => inv.status === 'pending')
                .map((invitation) => (
                  <div key={invitation.invitationId} className={styles.dropdownItem}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleAccept(invitation.invitationId)}
                      />
                      {' '}You are invited to a space
                    </label>
                  </div>
                ))
            ) : (
              <div className={styles.dropdownItem}>No pending invitations</div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
