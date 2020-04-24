import React from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostList=()=> {
  // console.log('func POST')
  const [posts, setPosts] = React.useState({});
  const fethPosts = async () => {
    const { data } = await axios.get("http://localhost:4002/posts");
    setPosts(data);
  };

  React.useEffect(() => {
    // console.log('efec POST')
    fethPosts();
  }, []);
  return (
    <div className="d-flex flex-row flex-wrap justify-content-around">
      {Object.values(posts).map((post) => (
        <div
          key={post.id}
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentsList comments={post.comments} />
            <CommentCreate postId={post.id}/>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
