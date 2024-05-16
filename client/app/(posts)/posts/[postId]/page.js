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
import Bin from "@/assets/bin.svg";
import { useForm } from "react-hook-form";
import Close from "@/assets/close.svg";
import UserPFP from "@/components/ui/user-pfp";

export default function PostDetails({ params }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const [post, setPost] = useState({});
	const [comment, setComment] = useState([]);
	const [loading, setLoading] = useState(true);
	const [owner, setOwner] = useState(false);
	const [error, setError] = useState(null);
	const [edit, setEdit] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState(false);
	const URL = "http://localhost:3000/";
	useEffect(() => {
		usePosts({ _id: params.postId }).then((response) => {
			setPost(response);
			setOwner(response[0].owner);
			setLoading(false);
		});
	}, []);

	async function createComment(event) {
		event.preventDefault();
		try {
			await axios.post(
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
				<div className="flex flex-col w-[85%]">
					<Card className=" h-min bg-transparet rounded-2xl border-none shadow-none">
						<CardHeader className="h-10 text-text text-base flex flex-row items-center gap-2 relative">
							<button
								className="text-white border rounded-full px-3 h-8 pb-1 mr-1 mt-2 text-xl font-semibold text-center"
								onClick={router.back}
							>
								←
							</button>
							<div className="w-8">
								<UserPFP
									containerClassName="sm-avatar"
									identiconClassName="scale-down"
									user={post[0].created_by}
								/>
							</div>

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
							<DotFilledIcon
								className=""
								width={18}
								height={18}
							/>
							<div>{dateToString(post[0].created_at)}</div>
							<div className="ml-auto">
								<ul>
									{owner ? (
										<>
											{!edit ? (
												<div
													className="rounded-full border px-4 py-1 border-secondary text-l font-semibold cursor-pointer hover:bg-secondary/40"
													onClick={() =>
														setEdit(true)
													}
												>
													Edit
												</div>
											) : (
												<div className="flex gap-2 items-center">
													<div
														className="rounded-full border px-4 py-1 border-secondary text-l font-semibold cursor-pointer hover:bg-secondary/40"
														onClick={() =>
															setEdit(false)
														}
													>
														Save
													</div>
													<div className="rounded-full border px-2 py-1 border-error hover:bg-error/30">
														<Bin
															fill={"#b32727"}
															onClick={() =>
																setConfirmPassword(
																	true
																)
															}
														/>
														{confirmPassword && (
															<Modal
																isOpen={true}
															>
																<div className=" relative flex flex-col w-[400px] h-[500px] bg-primary justify-center text-text text-center items-center p-2">
																	<Close
																		className="absolute top-3 right-3 cursor-pointer"
																		fill={
																			"#fff"
																		}
																		onClick={() =>
																			setConfirmPassword(
																				false
																			)
																		}
																		width={
																			30
																		}
																		height={
																			30
																		}
																	/>
																	<form
																		className="w-full h-full flex flex-col border-secondary border items-center justify-center pb-20 gap-10"
																		onSubmit={handleSubmit(
																			handleDelete
																		)}
																	>
																		<div className="text-2xl font-semibold">
																			Are
																			you
																			sure?
																		</div>
																		<div className="w-[65%]">
																			You
																			are
																			about
																			to
																			delete
																			this
																			post.
																			Please
																			confirm
																			by
																			typing
																			<b>
																				{" "}
																				"CONFIRM"
																			</b>
																		</div>
																		<div>
																			<input
																				type="text"
																				className="w-[65%] bg-transparent border border-secondary rounded-md py-2 px-4 focus:outline-none"
																				{...register(
																					"confirm",
																					{
																						validate:
																							(
																								value
																							) => {
																								if (
																									value ===
																									"CONFIRM"
																								) {
																									return true;
																								} else {
																									return false;
																								}
																							},
																						required: true,
																					}
																				)}
																			/>
																			{errors.confirm && (
																				<p className="mt-2 text-red-500">
																					Please
																					type
																					"CONFIRM"
																					to
																					delete
																				</p>
																			)}
																		</div>

																		<div className="flex gap-4">
																			<button
																				className="border border-error px-4 py-2 rounded-full hover:bg-error/40"
																				type="submit"
																			>
																				Delete
																			</button>
																		</div>
																	</form>
																</div>
															</Modal>
														)}
													</div>
												</div>
											)}
										</>
									) : null}
								</ul>
							</div>
						</CardHeader>
						<CardHeader>
							<p className="text-text text-3xl">
								{post[0].title}
							</p>
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
							<form onSubmit={createComment} className="w-full">
								<input
									type="text"
									className="w-full bg-black text-text border border-secondary rounded-full py-2 px-4
                    focus:outline-none"
									placeholder="Add a comment..."
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
							</form>
							{error ? (
								<p className="text-red-500">{error}</p>
							) : null}
						</CardFooter>
					</Card>
					<div className="w-[90%] self-center">
						<CommentList comments={post[0].comments} />
					</div>
				</div>
			)}
		</div>
	);
}
