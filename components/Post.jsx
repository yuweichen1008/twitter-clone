import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/solid'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { signIn, useSession } from 'next-auth/react'
import { db, storage } from '../firebase'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState, postIDState } from '../atom/modalAton'
import { useRouter } from 'next/router'

export default function Post({ post, id }) {

  const { data: session } = useSession()
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const [comments, setComments] = useState([])
  const [open, setOpen] = useRecoilState(modalState)
  const [postID, setPostID] = useRecoilState(postIDState)

  const likeRef = collection(db, "posts", id, "likes")
  const commentRef = collection(db, "posts", id, "comments")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      likeRef,
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      commentRef,
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    /*
    Query logic
    */
    console.log('i fire once');
  }, []);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes])

  async function likePost() {
    if (!session) {
      signIn()
    }
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
        username: session.user.username,
      })
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id))
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`))
      }
      router.push('/')
    }
  }

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
      {/* user image */}
      <img
        className='h-11 w-11 rounded-full mr-4'
        src={post?.data()?.userImg}
        alt="img"
      />
      {/* right side */}
      <div className='flex-1'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          {/* post user info */}
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post?.data()?.name}
            </h4>
            <span className='text-sm sm:text-[15px]'>
              @{post?.data()?.username} - {" "}
            </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>
                {post?.data()?.timestamp?.toDate()}
              </Moment>
            </span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 p-2' />
        </div>
        {/* post text */}
        <p
          onClick={()=> router.push(`/posts/${id}`)}
          className='text-gray-800 text-[15px] sm:text-[16px] mb-2'
        >
          {post?.data()?.text}
        </p>
        {/* post image */}
        <img
          className='rounded-2xl mr-2'
          src={post?.data()?.image}
          alt=""
        />

        {/* icons */}
        <div className='flex justify-between text-gray-600'>
          {/* Comment */}
          <div className='flex items-center space-x-1 select-none'>
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn()
                } else {
                  setPostID(id)
                  setOpen(!open)
                }
              }}
              className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'
            />
            {
              comments.length > 0 && (
                <span className='text-sm'>{comments.length}</span>
              )
            }
          </div>
          {/* Delete */}
          {
            session?.user.uid === post?.data()?.id && (
              <TrashIcon
                className='h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100'
                onClick={() => deletePost()}
              />
            )
          }
          {/* Like */}
          <div className='flex items-center'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={() => likePost()}
                className='h-9 w-9 hoverEffect p-2 text-red-500 hover:bg-red-100'
              />
            ) : (
              <HeartIcon
                onClick={() => likePost()}
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
