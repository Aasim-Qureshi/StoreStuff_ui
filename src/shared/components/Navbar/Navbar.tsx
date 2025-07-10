import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

import { acceptInvite, getInvitations } from '../../../app/spaceView/api';
import { getCurrentUser } from '../../../app/auth/api';

type Invitation = {
  invitationId: string;
  recipientEmail: string;
  status: 'pending' | 'accepted' | 'rejected';
};

type User = {
  id: string;
  email: string;
  username: string;
};

type NavbarProps = {
  searchType: 'spaceDashboard' | 'insideSpace';
  onSearch: (query: string) => void;
  onInvite?: (email: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  searchType,
  onSearch,
  onInvite,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res: any = await getCurrentUser();
        console.log('[Navbar] /auth/me response:', res.data);
        setUser(res.data);
      } catch (err) {
        console.error('[Navbar] Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('[Navbar] Input changed:', e.target.value);
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Navbar] Form submitted with:', inputValue);
    if (searchType === 'insideSpace') {
      console.log('[Navbar] Sending invite...');
      onInvite?.(inputValue);
    } else {
      console.log('[Navbar] Performing search...');
      onSearch(inputValue);
    }
    setInputValue('');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      const next = !prev;
      console.log(`[Navbar] Toggling dropdown: ${next ? 'Open' : 'Closed'}`);
      return next;
    });
  };

  useEffect(() => {
    console.log('[Navbar] useEffect triggered');
    console.log('[Navbar] isDropdownOpen:', isDropdownOpen);
    console.log('[Navbar] user?.email:', user?.email);

    const fetchInvitations = async () => {
      if (isDropdownOpen && user?.email) {
        console.log('[Navbar] Fetching invitations for:', user.email);
        setLoadingInvites(true);
        try {
          const response: any = await getInvitations(user.email);
          console.log('[Navbar] Invitations fetched:', response.data);
          setInvitations(response.data || []);
        } catch (err) {
          console.error('[Navbar] Failed to fetch invitations:', err);
          setInvitations([]);
        } finally {
          setLoadingInvites(false);
        }
      } else {
        console.log('[Navbar] Conditions not met. Skipping fetch.');
      }
    };

    fetchInvitations();
  }, [isDropdownOpen, user?.email]);

  const handleAccept = (invitationId: string) => {
    console.log('[Navbar] Accepting invitation:', invitationId);
    const response = acceptInvite(invitationId);
    console.log('[Navbar] Invitation accepted response:', response);
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
