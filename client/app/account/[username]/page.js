"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Account from "@/components/ui/account";
import SettingsPage from "@/components/ui/settings-page";
import Modal from "@/components/ui/Modal";
import { getUser } from "@/hooks/fetchUser";
import { useUserStore } from "@/context/UserContext";

export default function UserAccountPage({ params }) {
	const router = useRouter();
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeSetting, setActiveSetting] = useState("");
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
    const currentUser = useUserStore(state => state.user);

	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	const handleSettingChange = (settingType) => {
		if (user.username === currentUser.username) {
			setActiveSetting(settingType);
			toggleModal();
		} else {
			console.log("Cannot change settings for another user's profile.");
		}
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

					{user.username === currentUser.username && (
						<Modal isOpen={isModalOpen} onClose={toggleModal}>
							<SettingsPage
								toggle={toggleModal}
								activeSetting={activeSetting}
								user={user}
							/>
						</Modal>
					)}
				</>
			)}
		</main>
	);
}