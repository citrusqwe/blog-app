import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VKIcon, VKShareButton } from 'react-share';
import { articlesApi } from '../api';
import { API_LINK } from '../api/constants';
import useComponentVisible from '../hooks/useComponentVisible';
import { LoginModal } from './LoginModal';

interface IPostArticle {
  id: number;
  title: string;
  image: { url: string };
  slug: string;
  description: string;
  category: { name: string; slug: string };
  author: { name: string };
  currRating: number;
}

const PostArticle: React.FC<IPostArticle> = ({
  image,
  title,
  slug,
  description,
  category,
  author,
  id,
  currRating,
  // publishedAt,
}) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [modal, setModal] = useState(false);
  const { isLoged, jwt } = useSelector((user: RootStateOrAny) => user.user);

  const rateArticle = async (rate: string) => {
    if (!isLoged) setModal(true);
    const data = await articlesApi.rateArticle(id, rate, currRating, jwt);

    console.log(data);

    try {
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <article className="posts-grid__item post-item">
      <div className="post-item__info">
        <Link
          to={`/${category?.slug}`}
          className="post-item__category link-hover"
        >
          {category?.name}
        </Link>
        <div className="post-item__author">{author?.name}</div>
        {/* <div className="post-item__date">{publishedAt}</div> */}
      </div>
      <h4 className="post-item__title">{title}</h4>
      <p className="post-item__descr">{description}</p>
      <Link to={`/${category?.name}/${slug}`} className="post-item__link">
        <img
          src={`${API_LINK}${image?.url}` ?? ''}
          alt=""
          className="post-item__img"
        />
      </Link>
      <div className="post-item__footer post-footer">
        <LoginModal active={modal} setActive={setModal} />
        <div
          className="post-footer__share home-hover"
          onClick={() => setIsComponentVisible(!isComponentVisible)}
        >
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M 18 2 C 16.35499 2 15 3.3549904 15 5 C 15 5.1909529 15.021791 5.3771224 15.056641 5.5585938 L 7.921875 9.7207031 C 7.3985399 9.2778539 6.7320771 9 6 9 C 4.3549904 9 3 10.35499 3 12 C 3 13.64501 4.3549904 15 6 15 C 6.7320771 15 7.3985399 14.722146 7.921875 14.279297 L 15.056641 18.439453 C 15.021555 18.621514 15 18.808386 15 19 C 15 20.64501 16.35499 22 18 22 C 19.64501 22 21 20.64501 21 19 C 21 17.35499 19.64501 16 18 16 C 17.26748 16 16.601593 16.279328 16.078125 16.722656 L 8.9433594 12.558594 C 8.9782095 12.377122 9 12.190953 9 12 C 9 11.809047 8.9782095 11.622878 8.9433594 11.441406 L 16.078125 7.2792969 C 16.60146 7.7221461 17.267923 8 18 8 C 19.64501 8 21 6.6450096 21 5 C 21 3.3549904 19.64501 2 18 2 z M 18 4 C 18.564129 4 19 4.4358706 19 5 C 19 5.5641294 18.564129 6 18 6 C 17.435871 6 17 5.5641294 17 5 C 17 4.4358706 17.435871 4 18 4 z M 6 11 C 6.5641294 11 7 11.435871 7 12 C 7 12.564129 6.5641294 13 6 13 C 5.4358706 13 5 12.564129 5 12 C 5 11.435871 5.4358706 11 6 11 z M 18 18 C 18.564129 18 19 18.435871 19 19 C 19 19.564129 18.564129 20 18 20 C 17.435871 20 17 19.564129 17 19 C 17 18.435871 17.435871 18 18 18 z" />
          </svg>
        </div>
        <div className="post-footer__rate post-rate">
          <div
            className="post-rate__up post-rate__item home-hover"
            onClick={() => rateArticle('up')}
          >
            <svg
              enableBackground="new 0 0 32 32"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                fill="#515151"
              />
            </svg>
          </div>
          <div className="post-rate__count">{currRating}</div>
          <div
            className="post-rate__down post-rate__item home-hover"
            onClick={() => rateArticle('down')}
          >
            <svg
              enableBackground="new 0 0 32 32"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.77,23.795L5.185,14.21c-0.879-0.879-0.879-2.317,0-3.195l0.8-0.801c0.877-0.878,2.316-0.878,3.194,0  l7.315,7.315l7.316-7.315c0.878-0.878,2.317-0.878,3.194,0l0.8,0.801c0.879,0.878,0.879,2.316,0,3.195l-9.587,9.585  c-0.471,0.472-1.104,0.682-1.723,0.647C15.875,24.477,15.243,24.267,14.77,23.795z"
                fill="#515151"
              />
            </svg>
          </div>
        </div>
        {isComponentVisible && (
          <ul className="post-item__popup popup-list" ref={ref}>
            <li
              className="popup-list__item"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${document.baseURI}${category?.name}/${slug}`
                );
              }}
            >
              Копировать ссылку
            </li>
            <li className="popup-list__item">
              <VKShareButton
                title={title}
                url={`${document.baseURI}${category?.name}/${slug}`}
                image={`${API_LINK}${image?.url}` ?? ''}
                children={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <VKIcon
                      style={{
                        marginRight: '10px',
                        width: '20px',
                        height: '20px',
                      }}
                    />
                    Вконтакте
                  </div>
                }
              />
            </li>
          </ul>
        )}
      </div>
    </article>
  );
};

export default PostArticle;
