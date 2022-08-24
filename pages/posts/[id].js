import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import CommentModal from '../../components/CommentModal'
import Sidebar from '../../components/Sidebar'
import Widgets from '../../components/Widgets'
import Post from '../../components/Post'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { db } from '../../firebase'
import { onSnapshot, doc, query, collection, orderBy } from 'firebase/firestore'
import { AnimatePresence, motion } from "framer-motion";
import Comment from '../../components/Comment'

export default function PostPage({ newsResults, randomUsersResults }) {

    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState() // Notice here, do not use [] otherwise it will has sideEffect on page refresh generation
    const [comments, setComments] = useState([])

    useEffect(
        () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot))
        , [db, id]
    )

    // Debug code
    // useEffect(()=>{
    //     console.log(post)
    // }, [post])

    // get comments of the post
    useEffect(() => {
        onSnapshot(
            query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => setComments(snapshot.docs)
        )
    }, [db, id])

    return (
        <div>
            <Head>
                <title>Post Page</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex min-h-screen mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* Feed */}

                <div className='xl:ml-[370px] border-l border-r xl:min-w-[567px] sm:ml-[73px] flex-grow max-w-xl'>
                    <div className='flex py-2 px-3 sticky top-0 z-50 bg:white border-b border-gray-200 items-center space-x-2'>
                        <div className='hoverEffect' onClick={() => router.push('/')}>
                            <ArrowLeftIcon className='h-5' />
                        </div>
                        <h2 className='text-lg sm:text-xl font-bold'>
                            Tweet
                        </h2>
                    </div>

                    <Post id={id} post={post} />

                    {/* Comments */}
                    {comments.length > 0 && (
                        <div className="">
                            <AnimatePresence>
                                {comments.map((comment, index) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: index*.5 }}
                                    >
                                        <Comment
                                            key={comment.id}
                                            comment={comment.data()}
                                            commentID={comment.id}
                                            originalPostID={id}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Widgets */}

                <Widgets
                    newsResults={newsResults.articles}
                    randomUsersResults={randomUsersResults.results}
                />

                {/* Modal */}

                <CommentModal />
            </main>
        </div>
    )
}

export async function getServerSideProps() {
    const newsResults = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
        .then((res) => res.json());

    // Who to follow
    const randomUsersResults = await fetch('https://randomuser.me/api/?results=30&inc=name,login,picture')
        .then((res) => res.json());
    return {
        props: {
            newsResults,
            randomUsersResults,
        },
    };
}