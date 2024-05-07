'use client'

import React, { useState } from 'react';
import Account from '@/components/ui/account';
import SettingsPage from '@/components/ui/settings-page';
import Modal from '@/components/ui/Modal';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState(''); // Manage active setting

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSettingChange = (settingType) => {
    setActiveSetting(settingType);
    toggleModal();
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <Account toggle={() => handleSettingChange('profile')} />
      <Modal isOpen={isModalOpen}>
        <SettingsPage toggle={toggleModal} activeSetting={activeSetting} />
      </Modal>
    </main>
  );
}