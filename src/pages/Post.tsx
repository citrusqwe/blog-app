import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_POST } from '../redux/reducers/postsReducer';
import { API_LINK } from '../api/constants';
import { PostComments } from '../components/PostComments';
import { articlesApi } from '../api';

const Post: React.FC = () => {
  const dispatch = useDispatch();
  const { slug, category } = useParams();
  const { currentPost } = useSelector((posts: RootStateOrAny) => posts.posts);

  useEffect(() => {
    loadCurrentPost();

    return () => {
      dispatch(SET_CURRENT_POST({}));
    };
  }, [slug]);

  const loadCurrentPost = async () => {
    try {
      const data = await articlesApi.getCurrentArticle(slug);
      dispatch(SET_CURRENT_POST(data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="post">
        <div className="container post__container">
          <div className="post__top post-top">
            <h2 className="post-top__title title">{currentPost?.title}</h2>
            <p className="post-top__descr descr">{currentPost?.description}</p>
            <img
              src={`${API_LINK}${currentPost.image?.url}`}
              alt={currentPost?.title}
              className="post-top__img"
            />
          </div>
          <div className="post-body">
            <div className="container post-body__container">
              <div className="post__creator post-creator">
                <img
                  src={`${API_LINK}${currentPost?.author?.picture?.url}`}
                  alt={currentPost?.author?.name}
                  className="post-creator__img"
                />
                <div className="post-creator__info">
                  <span className="post-creator__name">
                    {currentPost?.author?.name}
                  </span>
                  <div className="post-creator__post-info">
                    <span className="post-creator__date">
                      {new Date(currentPost?.published_at).toLocaleDateString()}
                    </span>
                    <span className="post-creator__time">4 min read</span>
                  </div>
                </div>
                <ul className="post-creator__socials">
                  <li className="post-creator__socials-item">
                    <Link to="/" className="post-creator__socials-link">
                      Face
                    </Link>
                  </li>
                  <li className="post-creator__socials-item">
                    <Link to="/" className="post-creator__socials-link">
                      Twit
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="post-text">
                {ReactHtmlParser(currentPost?.content)}
              </div>
              <div className="post-share">
                <ul className="post-share__list">
                  <li className="post-share__item">
                    <Link to="/" className="post-share__link">
                      Share on Face
                    </Link>
                  </li>
                  <li className="post-share__item">
                    <Link to="/" className="post-share__link">
                      Share on Twit
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="post-tags">
                <span className="post-tags__span">Tags:</span>
                <ul className="post-tags__list">
                  <li className="post-tags__tag">
                    <Link
                      to={`${API_LINK}/articles?category.name=${currentPost?.category?.slug}`}
                      className="post-tags__link"
                    >
                      {currentPost?.category?.name}
                    </Link>
                  </li>
                </ul>
              </div>
              <PostComments post={currentPost} />
              {/* <div className="post-creator__about creator-about">
                <img
                  src="https://images.unsplash.com/photo-1549237511-bbe6a0979d6a?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="creator-about__img"
                />
                <p className="creator-about__text">
                  <strong>Mika Matikainen</strong> is a Design Founder &
                  Advisor, Berlin School of Creative Leadership Executive MBA
                  participant, Zippie advisor, Wolt co-founder, and Nordic Rose
                  stakeholder.
                </p>
              </div> */}
            </div>
          </div>
          <div className="post-next">
            <h2 className="post-next__title">What to read next</h2>
            <div className="post-next__posts">
              <article className="posts-grid__item post-item">
                <Link to="/" className="post-item__link">
                  <img
                    src="https://images.unsplash.com/photo-1577493327436-6b54af0aabb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80"
                    alt=""
                    className="post-item__img"
                  />
                </Link>
                <h4 className="post-item__title">
                  Here are some things you should know regarding how we work
                </h4>
              </article>
              <article className="posts-grid__item post-item">
                <Link to="/" className="post-item__link">
                  <img
                    src="https://images.unsplash.com/photo-1577493327436-6b54af0aabb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80"
                    alt=""
                    className="post-item__img"
                  />
                </Link>
                <h4 className="post-item__title">
                  Here are some things you should know regarding how we work
                </h4>
              </article>
              <article className="posts-grid__item post-item">
                <Link to="/" className="post-item__link">
                  <img
                    src="https://images.unsplash.com/photo-1577493327436-6b54af0aabb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80"
                    alt=""
                    className="post-item__img"
                  />
                </Link>
                <h4 className="post-item__title">
                  Here are some things you should know regarding how we work
                </h4>
              </article>
              <article className="posts-grid__item post-item">
                <Link to="/" className="post-item__link">
                  <img
                    src="https://images.unsplash.com/photo-1577493327436-6b54af0aabb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80"
                    alt=""
                    className="post-item__img"
                  />
                </Link>
                <h4 className="post-item__title">
                  Here are some things you should know regarding how we work
                </h4>
              </article>
            </div>
          </div>
          <div className="post-newsletter">
            <h2 className="post-newsletter__title">
              Sign up for the newsletter
            </h2>
            <p className="post-newsletter__descr">
              If you want relevant updates occasionally, sign up for the private
              newsletter. Your email is never shared.
            </p>
            <form action="" className="post-newsletter__form newsletter-form">
              <input
                type="email"
                className="newsletter-form__input"
                placeholder="Enter your email..."
              />
              <button
                type="submit"
                className="newsletter-form__btn btn-reset btn-hover"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Post;
