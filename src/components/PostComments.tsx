import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_LINK } from '../api/constants';
import { SET_CURRENT_POST } from '../redux/reducers/postsReducer';
import { LoginModal } from './LoginModal';

interface IPostComments {
  post: {
    id: number | string;
    comments: [];
  };
}

export const PostComments: React.FC<IPostComments> = ({ post }) => {
  const dispatch = useDispatch();
  const { isLoged, user, jwt } = useSelector(
    (user: RootStateOrAny) => user.user
  );
  const [modal, setModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['blogauth']);

  const sendComment = async () => {
    if (!isLoged) setModal(true);
    else {
      if (commentText) {
        await axios
          .post(
            `${API_LINK}/comments`,
            {
              user,
              text: commentText,
              article: post,
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then(async (res) => {
            const { data } = await axios.put(
              `${API_LINK}/articles/${post.id}`,
              {
                comments: [...post.comments, res.data],
              },
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            );
            dispatch(SET_CURRENT_POST(data));
            setCommentText('');
          })
          .catch((e) => console.log(e));
      }
    }
  };

  const deleteComment = async (id: number) => {
    if (!isLoged) setModal(true);
    else {
      await axios
        .delete(`${API_LINK}/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then(async ({ data: { id } }) => {
          const { data } = await axios.put(
            `${API_LINK}/articles/${post.id}`,
            {
              comments: post.comments.filter(
                (p: { id: number }) => p.id !== id
              ),
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          dispatch(SET_CURRENT_POST(data));
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className="commnets">
      <div className="container">
        <p className="comments__text">
          <span>{post?.comments?.length}</span>
          {post?.comments?.length === Number(1)
            ? ' комментарий'
            : post?.comments?.length > 1
            ? ' комментария'
            : ' комментариев'}
        </p>
        <div className="comments__form">
          <div className="form__input">
            <input
              type="text"
              className="input-hover"
              placeholder="Написать комментарий"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
            <span className="focus-border"></span>
          </div>
          <button className="btn-hover btn-reset" onClick={sendComment}>
            Отправить
          </button>
        </div>
        <LoginModal active={modal} setActive={setModal} />
        <div className="comments__grid">
          {post?.comments?.map((c: any) => (
            <div className="comments__item comment" key={c.id}>
              <div className="comment__header">
                <img
                  src={user?.avatar}
                  alt={c.user?.name}
                  className="comment__avatar"
                />
                <div className="comment__author comment-author">
                  <Link to="/">
                    <span className="comment-author__name">
                      {c.user?.username}
                    </span>
                  </Link>
                  <div className="comment-author__publish-date">
                    {new Date(c?.published_at).toLocaleString()}
                  </div>
                </div>
                {c.user?.id === user.id && (
                  <button
                    className="comment__delete btn-reset"
                    onClick={() => deleteComment(c.id)}
                  >
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 60.963 60.842"
                    >
                      <path
                        fill="#000"
                        d="M59.595,52.861L37.094,30.359L59.473,7.98c1.825-1.826,1.825-4.786,0-6.611
	c-1.826-1.825-4.785-1.825-6.611,0L30.483,23.748L8.105,1.369c-1.826-1.825-4.785-1.825-6.611,0c-1.826,1.826-1.826,4.786,0,6.611
	l22.378,22.379L1.369,52.861c-1.826,1.826-1.826,4.785,0,6.611c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369
	l22.502-22.502l22.501,22.502c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369
	C61.42,57.647,61.42,54.687,59.595,52.861z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="comment__content">
                <p className="comment__text">{c?.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
