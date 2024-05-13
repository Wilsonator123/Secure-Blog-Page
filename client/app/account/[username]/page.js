'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Account from '@/components/ui/account';
import SettingsPage from '@/components/ui/settings-page';
import Modal from '@/components/ui/Modal';
import { useUserStore } from '@/context/UserContext';
import { updateUser } from '@/hooks/user';

export default function UserAccountPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeSetting, setActiveSetting] = useState("");
    const [loading, setLoading] = useState(true);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const handleSettingChange = (settingType) => {
        setActiveSetting(settingType);
        toggleModal();
    };

    useEffect(() => {
        if (router.isReady) {
            const { username } = router.query;
            updateUser(username)
            .then(user => {
                setUser(user);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch user data:", error);
                setLoading(false);
            });
        }
    }, [router.isReady, router.query]);

    return (
        <main className="flex min-h-screen flex-col items-center bg-background">
            <Account
                user={user}
                toggle={() => handleSettingChange("profile")}
            />
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <SettingsPage
                    toggle={toggleModal}
                    activeSetting={activeSetting}
                    user={user}
                />
            </Modal>
        </main>
    );
}