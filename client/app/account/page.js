'use client'

import React, { useState } from 'react';
import Account from '@/components/ui/account';
import SettingsPage from '@/components/ui/settings-page';
import Modal from '@/components/ui/Modal';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <Account toggle={toggleModal} />
      <Modal isOpen={isModalOpen}>
        <SettingsPage toggle={toggleModal} />
      </Modal>
    </main>
  );
}