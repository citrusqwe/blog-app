import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import 'react-quill/dist/quill.snow.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ChangeEvent } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

interface IFormState {
  postTitle: string;
  imageUrl: any;
}

const CreatePost: React.FC = () => {
  const [postHtml, setPostHtml] = useState('');
  const [choosenFile, setChoosenFile] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [postState, setPostState] = useState<IFormState>({
    postTitle: '',
    imageUrl: '',
  });
  const { currentUser } = useSelector((user: RootStateOrAny) => user.user);

  console.log(postState);

  Quill.register('modules/imageUploader', ImageUploader);
  const toolbarOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean', 'image'],
    ],
  };

  const postStateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPostState({ ...postState, [e.target.id]: e.target.value });
  };

  const selectBlogCover = async (e: ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files![0];
    // const imageRef = storageRef.child(file.name);
    // if (file) {
    //   await imageRef
    //     .put(file)
    //     .then(() => console.log('file uploaded'))
    //     .catch((e) => console.log(e.message));
    //   setPostState({ ...postState, imageUrl: await imageRef.getDownloadURL() });
    //   setChoosenFile(file.name);
    // }
  };

  const publishPost = async () => {
    // const postObj = {
    //   ...postState,
    //   postHtml,
    //   author: { ...currentUser },
    //   createdAt: timestamp(),
    // };
    // if (postState && postHtml) {
    //   await firestore
    //     .collection('blogs')
    //     .doc()
    //     .set(postObj)
    //     .then(() => console.log('success'))
    //     .catch((e) => console.log(e.message));
    // }
  };

  return (
    <>
      <Header />
      <div className="create-post">
        <div className="container">
          <h2 className="create-post__title title">Create post</h2>
          <div className="create-post__body create-body">
            <div className="create-body__top">
              <div className="create-body__title">
                <input
                  type="text"
                  placeholder="Enter blog title"
                  className="create-body__input input-hover"
                  id="postTitle"
                  value={postState.postTitle}
                  onChange={postStateHandler}
                />
                <span className="focus-border"></span>
              </div>
              <div className="create-body__upload">
                <label htmlFor="upload-photo">Upload photo</label>
                <input
                  type="file"
                  id="imageUrl"
                  accept=".png, .jpg, .jpeg, .svg"
                  onChange={selectBlogCover}
                />
                {/* <button className="btn-reset btn">Preview blog photo</button> */}
                <span className="create-body__choosenfile">
                  File Chosen: {choosenFile}
                </span>
              </div>
            </div>
            <div className="create-body__editor">
              <ReactQuill
                theme="snow"
                value={postHtml}
                onChange={setPostHtml}
                modules={toolbarOptions}
              />
            </div>
            <div className="create-body__btns">
              <button
                className="create-body__btn btn btn-reset"
                onClick={publishPost}
              >
                Publish post
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
