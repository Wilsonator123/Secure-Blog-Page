"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Account from "@/components/ui/account";
import SettingsPage from "@/components/ui/settings-page";
import Modal from "@/components/ui/Modal";
import { getUser } from "@/hooks/fetchUser";
import { set } from "react-hook-form";

export default function UserAccountPage({ params }) {
	const router = useRouter();
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeSetting, setActiveSetting] = useState("");
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	const handleSettingChange = (settingType) => {
		setActiveSetting(settingType);
		toggleModal();
	};

	useEffect(() => {
		const username = params.username;
		getUser(username)
			.then((data) => {
				setUser(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Failed to fetch user data:", error);
				setLoading(false);
			});
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center bg-background">
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
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
				</>
			)}
		</main>
	);
}
