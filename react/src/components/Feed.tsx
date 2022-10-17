import React, { useEffect, useState } from "react";
import "./styling/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
//import db from "./firebase";

function Feed() {
    const [posts, setPosts] = useState([]);
    //reworked once blockchain connection is set up
    useEffect(() => {
        // db.collection("posts").onSnapshot((snapshot: any) => {
        //     setPosts(snapshot.docs.map((doc: any) => doc.data()));
        // });
    }, []);

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {posts.map((post) => (
                <Post
                    displayName={post['displayName']}
                    username={post['username']}
                    verified={post['verified']}
                    text={post['text']}
                    avatar={post['avatar']}
                    image={post['image']}
                />
            ))}
        </div>
    );
}

export default Feed;