import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import PostArticle from '../components/PostArticle';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { API_LINK } from '../api/constants';
import { RESET_PAGE, SET_PAGE } from '../redux/reducers/pagesReducer';
import { SET_POSTS, SET_POSTS_COUNT } from '../redux/reducers/postsReducer';
import { articlesApi } from '../api';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface Post {
  id: number;
  title: string;
  image: { url: string };
  slug: string;
  description: string;
  category: { name: string; slug: string };
  author: { name: string };
  rating: number;
  // published_at: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, currentPage, isLoaded, isLoading, postsCount } = useSelector(
    (posts: RootStateOrAny) => posts.posts
  );
  const { page } = useSelector((pages: RootStateOrAny) => pages.pages);
  const [scrollPage, setScrollPage] = useState(1);
  const [more, setMore] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_LINK}/homepage`)
      .then(({ data }) => dispatch(SET_PAGE(data)));

    const data = articlesApi.articlesCount();
    data.then((res) => dispatch(SET_POSTS_COUNT(res)));

    return () => {
      dispatch(RESET_PAGE());
    };
  }, []);

  useEffect(() => {
    loadData();

    return () => {
      dispatch(SET_POSTS([]));
    };
  }, []);

  const loadData = async () => {
    try {
      if (more) {
        const data = await articlesApi.getArticles((scrollPage - 1) * 3, 3);
        dispatch(SET_POSTS([...posts, ...data]));
        setScrollPage((prevState) => prevState + 1);
        if (posts.length >= postsCount && posts.length !== 0) setMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <main className="main">
        <section className="hero">
          <div className="container">
            <div className="hero__post hero-post">
              <img
                src={`${API_LINK}${page?.hero?.image[0].url}`}
                alt=""
                className="hero-post__img"
              />
              <h2 className="hero-post__title title">{page?.hero?.title}</h2>
              <p className="hero-post__descr descr">
                {page?.hero?.description}
              </p>
            </div>
            <section className="posts">
              <div className="container">
                <h2 className="posts__title">All articles</h2>
                {!isLoaded && (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Loader type="Oval" color="#000" height={100} width={100} />
                  </div>
                )}
                <InfiniteScroll
                  className="posts__grid posts-grid"
                  dataLength={posts.length}
                  next={loadData}
                  hasMore={more}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Posts are gone</b>
                    </p>
                  }
                >
                  {posts?.map((post: Post) => (
                    <PostArticle
                      key={post.id}
                      title={post.title}
                      image={post.image}
                      id={post.id}
                      slug={post.slug}
                      description={post.description}
                      category={post.category}
                      author={post.author}
                      currRating={post.rating}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
