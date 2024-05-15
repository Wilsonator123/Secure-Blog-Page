"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { usePosts } from "@/hooks/usePosts";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { dateToString } from "@/helper/time";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import CtaButtons from "@/components/ui/cta-buttons";
import CommentList from "@/components/ui/comment-list";
import Ellipsis from "@/assets/ellipsis.svg";
import axios from "axios";
import Modal from "@/components/ui/modal";
import { useDeletePost } from "@/hooks/useDeletePost";

export default function PostDetails({ params }) {
	const router = useRouter();
	const [post, setPost] = useState({});
	const [comment, setComment] = useState([]);
	const [loading, setLoading] = useState(true);
	const [owner, setOwner] = useState(false);
	const [error, setError] = useState(null);
	const [hidden, setHidden] = useState(true);
	const URL = "http://localhost:3000/";
	/*const [isModalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};*/

	const toggleHidden = () => {
		setHidden(!hidden);
	};

	useEffect(() => {
		usePosts({ _id: params.postId }).then((response) => {
			setPost(response);
			setOwner(response[0].owner);
			setLoading(false);
		});
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8000/comments/createComment",
				{ postId: post[0]._id, comment: comment },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			window.location.reload();
		} catch (error) {
			setError(error.response.data.message);
		}
	}

	async function handleDelete(event) {
		event.preventDefault();

		try {
			const response = await useDeletePost(post[0]._id);
			if (response) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
			setError(error.response);
		}
	}

	return (
		<div className="flex w-4/5 justify-center my-8">
			{loading ? (
				<p className="text-text text-2xl">Loading...</p>
			) : (
				<Card className="w-5/6 h-min bg-primary rounded-2xl border-secondary">
					<CardHeader className="h-10 text-text text-base flex flex-row items-center gap-2 relative">
						<button
							className="text-white border rounded-full px-3 h-8 pb-1 mr-1 mt-2 text-xl font-semibold text-center"
							onClick={router.back}
						>
							←
						</button>

						<div
							className="flex flex-row items-center cursor-pointer justify-center h-8 font-semibold underline"
							onClick={() =>
								router.push(
									`${URL}account/${post[0].created_by}`
								)
							}
						>
							{post[0].created_by}
						</div>
						<DotFilledIcon className="" width={18} height={18} />
						<div>{dateToString(post[0].created_at)}</div>
						<div className="ml-auto">
							<ul>
								{owner ? (
									<>
										<li className="text-text text-lg cursor-pointer">
											Edit
										</li>
										<li
											className="text-red-500 text-lg cursor-pointer"
											onClick={toggleHidden}
										>
											Delete
										</li>
									</>
								) : null}
							</ul>
						</div>
					</CardHeader>
					<CardHeader>
						<p className="text-text text-3xl">{post[0].title}</p>
						{hidden ? null : (
							<div className="ml-auto">
								<p className="text-text">
									Are you sure you want to delete this post?
								</p>
								<input
									type="submit"
									value="Yes"
									className="bg-red-500 text-white rounded-full py-2 px-4 mr-4 cursor-pointer"
									onClick={handleDelete}
								/>
								<input
									type="submit"
									value="No"
									className="bg-green-500 text-white rounded-full py-2 px-4 cursor-pointer"
									onClick={toggleHidden}
								/>
							</div>
						)}
					</CardHeader>
					<CardDescription className="text-gray-300 text-lg mx-6">
						{post[0].content}
					</CardDescription>
					<CardFooter className="my-6">
						<CtaButtons
							numberOfComments={post[0].comments.length}
						/>
					</CardFooter>
					<CardFooter className="my-6">
						<form onSubmit={handleSubmit} className="w-full">
							<input
								type="text"
								className="w-full bg-black text-text border border-secondary rounded-full py-2 px-4
                    focus:outline-none"
								placeholder="Add a comment..."
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
						</form>
						{error ? <p className="text-red-500">{error}</p> : null}
					</CardFooter>
					<CommentList comments={post[0].comments} />
				</Card>
			)}
		</div>
	);
}
