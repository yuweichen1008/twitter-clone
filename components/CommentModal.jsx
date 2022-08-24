import React, { useEffect, useState } from 'react'
import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, postIDState } from '../atom/modalAton'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import Moment from 'react-moment'
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useSession } from 'next-auth/react'

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState)
  const [postID] = useRecoilState(postIDState)
  const [input, setInput] = useState("")
  const [post, setPost] = useState({})
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    onSnapshot(doc(db, "posts", postID), (snapshot) => {
      setPost(snapshot)
    })
  }, [postID, db])

  async function sendComment() {
    await addDoc(collection(db, "posts", postID, "comments"), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp()
    })

    setOpen(false)
    setInput("")
    router.push(`/posts/${postID}`)
  }

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-gray-20 border-2 rounded-xl'
        >
          <div className='p-1'>
            <div className='border-b border-gray-200 py-2 px-1.5'>
              <div
                onClick={() => setOpen(false)}
                className='hoverEffect w-9 h-9 flex items-center justify-center'
              >
                <XIcon className='h-[23px] text-gray-600' />
              </div>
            </div>

          </div>
          <div className='p-2 flex items-center space-x-1 relative'>
            <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-400'></span>
            <img
              className='h-11 w-11 rounded-full mr-4'
              src={post?.data()?.userImg}
              alt="img"
            />
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post?.data()?.name}
            </h4>
            <span className='text-sm sm:text-[15px]'>
              @{post?.data()?.username} - {" "}
            </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>

          <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>
            {post?.data()?.text}
          </p>

          <div className='flex p-3 space-x-3'>
            <img
              src={session.user.image}
              alt="user-img"
              className='h-11 w-11 rounded-full cursor-pointer hover:brightness-80'
            />
            <div className='w-full divide-y divide-gray-200'>
              <div className=''>
                <textarea
                  className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700'
                  rows="2"
                  placeholder="Tweet your reply"
                  value={input}
                  onChange={(e) => { setInput(e.target.value) }}
                ></textarea>
              </div>

              <div className='flex items-center justify-between pt-2.5'>
                <div className='flex'>
                  <div
                    className=''
                  // onClick={() => filePickerRef.current.click()}
                  >
                    <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                    {/* <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    /> */}
                  </div>
                  <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                </div>
                <button
                  onClick={sendComment}
                  className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                  disabled={!input.trim()}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
