import React , { useState, useEffect } from 'react';
import { db } from './firebase';
import firebase from "firebase";
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';

import TelegramIcon from '@material-ui/icons/Telegram';
import './PostCard.css';


function PostCard({ postId, origuser, username, userId, caption, imageUrl, noLikes }) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState('like2');
  const [show2, setShow2] = useState('textforlike');

  useEffect(() => {
      let unsubscribe;
      if (postId) {
          unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
          });
      }
      return () => {
          unsubscribe();
      }
  }, [postId]);

  useEffect(() => {
      db.collection("posts")
          .doc(postId)
          .collection("likes")
          .doc(userId)
          .get()
          .then(doc2 => {
              if (doc2.data()) {
                  if (show === 'like2') {
                      setShow('like2 blue');
                      setShow2('textforlike bluetextforlike')
                  } else {
                      setShow('like2');
                      setShow2('textforlike')
                  }
              }
          })
  }, [postId, userId]);

  // const commentShow = () => {
  //     var element = document.getElementById('1');
  //     var element2 = document.getElementById('2');
  //     if (element.style.display === "none") {
  //         element.style.display = "flex";
  //         element2.style.display = "block";
  //     } else {
  //         element.style.display = "none";
  //         element2.style.display = "none";
  //     }
  // }

  const likeHandle = (event) => {
      event.preventDefault();
      if (show === 'like2') {
          setShow('like2 blue');
          setShow2('textforlike bluetextforlike')
      } else {
          setShow('like2');
          setShow2('textforlike')
      }

      db.collection('posts')
          .doc(postId)
          .get()
          .then(docc => {
              const data = docc.data()
              console.log(show)
              if (show === 'like2') {
                  db.collection("posts")
                      .doc(postId)
                      .collection("likes")
                      .doc(userId)
                      .get()
                      .then(doc2 => {
                          if (doc2.data()) {
                              console.log(doc2.data())
                          } else {
                              db.collection("posts").doc(postId).collection("likes").doc(userId).set({
                                  likes: 1
                              });
                              db.collection('posts').doc(postId).update({
                                  noLikes: data.noLikes + 1
                              });
                          }
                      })

              } else {
                  db.collection('posts').doc(postId).collection('likes').doc(userId).delete().then(function () {
                      db.collection('posts').doc(postId).update({
                          noLikes: data.noLikes - 1
                      });
                  })
              }
          })

  }


  const postComment = (event) => {
      event.preventDefault();

      db.collection("posts").doc(postId).collection("comments").add({
          text: comment,
          username: origuser,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setComment('');
  }


    return (
        <div className="cards">
        <div className="card">
    <div className ="postcard">

        <div className ="postcard__header">
          <Avatar
            src= ""
            alt=""
            className= "postcard__avatar"
          />
         
       

        <div className="postcard__headerInfo">
            <h4 className="postcard__user">{username}</h4>
         
            
        </div>
        </div>
        <div className ="postcard__message">
            <p>{caption}</p>
        </div>

        <div className="postcard__image">
          
          <img src={imageUrl} alt="" />


          
        </div>

        <div className="post__likeandlove">
             <FavoriteIcon className="post__icons"/>
                <p>{noLikes} </p>
            </div>

      

        <div className="postcard__options">
          <div className="postcard__option" onClick={likeHandle}>
            <FavoriteIcon className={show} />
            <p className={show2}> Me encanta</p>
          </div>
         
        

          <div className="postcard__option">
            <TelegramIcon/>
            <p>Mensaje</p>
          </div>

        </div>
      
        <form onSubmit={postComment}>
                <div className="commentBox">
                    <Avatar
                        className="post__avatar2"
                        alt=""
                        src=""
                    />
                    <input className="commentInputBox" type="text" placeholder="Comentar ... " onChange={(e) => setComment(e.target.value)} />
                    <input type="submit" disabled={!comment} className="transparent__submit" />
                </div>
                <p className="pressEnterToPost">Press Enter to post</p>
            </form>

            {
                comments.map((comment) => (
                    <div className={`comments__show myself`}>
                        <Avatar
                            className="post__avatar2"
                            alt=""
                            src=""
                        />
                        <div class="container__comments">
                            <p><span>{comment.username}</span><i class="post__verified"></i>&nbsp; {comment.text}</p>
                        </div>
                    </div>
                ))
            }    
     </div>
     </div>
     </div>
    )
}

export default PostCard
