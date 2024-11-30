import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../config/firebase';


export default function  Test ()  {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);
  
    const uploadFile = () => {
      if (image == null) return;
  
      const imagePath = `img/${image.name + uuidv4()}`;
      console.log('imagePath', imagePath);
      const imageRef = ref(storage, imagePath);
      const uploadTask = uploadBytesResumable(imageRef, image);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (err) => {
          console.log('hi');
          console.log('Error while uploading file', err);
        },
        () => {
          setProgress(0);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImageUrls((prev) => [...prev, downloadURL]);
          });
        }
      );
    };
  
       // Upload file
       const upload =() => {
  
          if (image === null) {
             return;
             console.log("no image selected");
          }
          console.log(">>>");
          const imagePath = `product/${image.name + uuidv4()}`;
          const imageRef = ref(storage,imagePath);
          const uploadFile = uploadBytesResumable(imageRef, image);
      
          uploadFile.on('state_changed', (snapshot) => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            setProgress(progress)
          }, (err) => {
            console.log("error while uploading file", err);
          }, () => {
            setProgress(0);
            getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
            
          
            console.log(imagePath);
            // Save the path of the uploaded image
         
      
              setImageUrl(downloadURL)
             console.log(downloadURL);
              console.log(imageUrl);
                  
      
            });
            setImage(null);
          });
         
        }
  
    return (
      <div>
        <input
          type="file"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
        <button onClick={upload}>Upload Image</button>
        <div>Progress: {progress}%</div>
        <div>
     
        </div>
      </div>
    );

  };
