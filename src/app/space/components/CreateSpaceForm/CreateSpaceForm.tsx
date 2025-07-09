import React, { useState } from 'react';
import styles from './CreateSpaceForm.module.css';

interface CreateSpaceFormProps {
  onCreate: (spaceName: string) => Promise<void>;
}

const CreateSpaceForm: React.FC<CreateSpaceFormProps> = ({ onCreate }) => {
  const [spaceName, setSpaceName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spaceName.trim()) return;
    setIsSubmitting(true);
    await onCreate(spaceName.trim());
    setSpaceName('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Enter space name"
        value={spaceName}
        onChange={(e) => setSpaceName(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Space'}
      </button>
    </form>
  );
};

export default CreateSpaceForm;
