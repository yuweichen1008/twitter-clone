import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/solid'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { signIn, useSession } from 'next-auth/react'
import { db } from '../firebase'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, postIDState } from '../atom/modalAton'
import { useRouter } from 'next/router'

export default function Comment({ comment, commentID, originalPostID }) {

    const { data: session } = useSession()
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [open, setOpen] = useRecoilState(modalState)
    const [postID, setPostID] = useRecoilState(postIDState)
    const router = useRouter()

    const commentRef = collection(db, "posts", originalPostID, "comments", commentID, "likes")

    // Debug message
    // useEffect(() => {
    //     console.log(comment)
    //     console.log(commentID)
    //     console.log(originalPostID);
    // }, [])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            commentRef,
            (snapshot) => setLikes(snapshot.docs)
        );
    }, [db, originalPostID, commentID]);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
    }, [likes])

    async function likeComment() {
        if (!session) {
            signIn()
        }
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", originalPostID, "comments", commentID, "likes", session?.user.uid));
        } else {
            await setDoc(doc(db, "posts", originalPostID, "comments", commentID, "likes", session?.user.uid), {
                username: session.user.username,
            })
        }
    }

    async function deleteComment() {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            deleteDoc(doc(db, "posts", originalPostID, "comments", commentID))
        }
    }

    return (
        <div className='flex p-3 cursor-pointer border-b border-gray-200 pl-20'>
            {/* user image */}
            <img
                className='h-11 w-11 rounded-full mr-4'
                src={comment?.userImg}
                alt="img"
            />
            {/* right side */}
            <div className='flex-1'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    {/* comment user info */}
                    <div className='flex items-center space-x-1 whitespace-nowrap'>
                        <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
                            {comment?.name}
                        </h4>
                        <span className='text-sm sm:text-[15px]'>
                            @{comment?.username} - {" "}
                        </span>
                        <span className='text-sm sm:text-[15px] hover:underline'>
                            <Moment fromNow>
                                {comment?.timestamp?.toDate()}
                            </Moment>
                        </span>
                    </div>
                    {/* dot icon */}
                    <DotsHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 p-2' />
                </div>
                {/* post text */}
                <p
                    // onClick={() => router.push(`/posts/${id}`)}
                    className='text-gray-800 text-[15px] sm:text-[16px] mb-2'
                >
                    {comment?.comment}
                </p>

                {/* icons */}
                <div className='flex justify-between text-gray-600'>
                    {/* Comment */}
                    <div className='flex items-center space-x-1 select-none'>
                        <ChatIcon
                            onClick={() => {
                                if (!session) {
                                    signIn()
                                } else {
                                    setPostID(originalPostID)
                                    setOpen(!open)
                                }
                            }}
                            className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'
                        />
                        {
                            comment.length > 0 && (
                                <span className='text-sm'>{comment.length}</span>
                            )
                        }
                    </div>
                    {/* Delete */}
                    {session?.user.uid === comment?.userID && (
                        <TrashIcon
                            className='h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100'
                            onClick={() => deleteComment()}
                        />
                    )}
                    {/* Like */}
                    <div className='flex items-center'>
                        {hasLiked ? (
                            <HeartIconFilled
                                onClick={() => likeComment()}
                                className='h-9 w-9 hoverEffect p-2 text-red-500 hover:bg-red-100'
                            />
                        ) : (
                            <HeartIcon
                                onClick={() => likeComment()}
                                className='h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100'
                            />
                        )}
                        {
                            likes.length > 0 && (
                                <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>
                                    {" "}
                                    {likes.length}
                                </span>
                            )
                        }
                    </div>
                    {/* Share */}
                    <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
                    {/* Chart */}
                    <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
                </div>
            </div>
        </div>
    )
}
