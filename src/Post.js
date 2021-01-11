import React , {useState} from 'react';
import './Post.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import { storage, db } from "./firebase.js";

import firebase from "firebase";
import Avatar from '@material-ui/core/Avatar';
import post_photo from './img/post_photo.png';
import post_lost from './img/post_lost.png';
import post_found from './img/post_found.png';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        height: 343,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #DDDFE2',
        outline: 'none',
        boxShadow: theme.shadows[5],
        borderRadius: '5px',
    },
}));



function Post({ username } ) {
const classes = useStyles(); 
const [modalStyle] = useState(getModalStyle);
const [comment,setComment] = useState ('');
const [input , setInput]= useState ('');
const [image, setImage] = useState('');
const [open, setOpen] = useState(false);
const [noLikes, setNoLikes] = useState(0);
const [caption, setCaption] = useState('');
const [progress, setProgress] = useState(0);




  

    const uploadFileWithClick = () => {
        document.getElementsByClassName('postImage')[0].click()
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpload = (event) => {
        event.preventDefault()

        if (image === '') {
            db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: image,
                noLikes: noLikes,
                username: username
            })
        } else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                noLikes: noLikes,
                                username: username,
                            });
                            handleClose();
                            setProgress(0);
                            setCaption("")
                            setImage(null);
                        })
                }
            )
        }
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }


    return (
    <div className="post">

            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="post__commentAssign">
                       
                       
                        <div className="post__top">
                            <Avatar
                                className="post__avatar"
                                alt=""
                            />
                            <input className="post__input" type="text" onChange={(e) => setCaption(e.target.value)} onClick={handleOpen} placeholder={`¿Te gustaria comentar algo ${username} ?`} />
                        </div>
                        <hr />
                        <div className="post__option" onClick={uploadFileWithClick}>
                            <img src={post_photo} className="post__gallery" alt=""></img>
                            <input type="file" className="postImage" onChange={handleChange} />
                            <h3>Foto</h3>
                        </div>
                        <br />
                        <div className="imageupload__feedModal">
                            <label class="containerr">
                                <input type="checkbox" checked />
                                
                            </label>
                            
                            <br />
                            <h2 className={`imageText ${image && 'show'}`}>Haz clic en postear para cargar la imagen</h2>
                            <progress value={progress} max="100" className={`progress ${progress && 'show'}`} />
                            <Button type="submit" onClick={handleUpload} className="imageupload__submitButton">Postear</Button>
                        </div>
                    </form>
                </div>
            </Modal>
                        
        
        <div className="post__top">
            <Avatar  />
            <form>
            <input 
                    
                   type ="text"
                   placeholder={`¿Te gustaria comentar algo ${username} ?`}
                   className="post__input"
                   onClick={handleOpen}

                   />

                   
           
            </form>
        </div>

        <div className="post__botton" onClick= {setOpen}>

            <div className="post__option" >
            <img src={post_photo} alt="" />
            <h3>Foto/Video</h3>
            </div>
            

            <div className="post__option" onClick= {setOpen} >
            <img src={post_lost} alt="" />
            <h3>Perdido</h3>
            </div>
            

            <div className="post__option" onClick= {setOpen} >
            <img src={post_found} alt="" />
            <h3>Encontrado</h3>
            </div>
            
           

        </div>


    </div>
    )
}

export default Post


