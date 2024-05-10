"use client";

import React, { useState, useEffect } from "react";
import Account from "@/components/ui/account";
import SettingsPage from "@/components/ui/settings-page";
import Modal from "@/components/ui/Modal";
import { useUserStore } from "@/context/UserContext";
import { updateUser } from "@/hooks/user";
export default function Home() {
	const user = useUserStore((state) => state.user);
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeSetting, setActiveSetting] = useState(""); // Manage active setting
	const [loading, setLoading] = useState(true);
	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	const handleSettingChange = (settingType) => {
		setActiveSetting(settingType);
		toggleModal();
	};

	useEffect(() => {
		async function fetchUser() {
			await updateUser().then(setLoading(false));
		}
		fetchUser();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center bg-background">
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					{user && (
						<>
							<Account
								user={user}
								toggle={() => handleSettingChange("profile")}
							/>
							<Modal isOpen={isModalOpen}>
								<SettingsPage
									toggle={toggleModal}
									activeSetting={activeSetting}
									user={user}
								/>
							</Modal>
						</>
					)}
				</>
			)}
		</main>
	);
}
