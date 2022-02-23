import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SET_ALL_POSTS } from '../redux/reducers/postsReducer';
import { useLocation } from 'react-router';
import { Post } from './Home';
import PostArticle from '../components/PostArticle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { articlesApi } from '../api';

export const Category = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const { allPosts, sort, postsCount } = useSelector(
    (posts: RootStateOrAny) => posts.posts
  );
  const [scrollPage, setScrollPage] = useState(1);
  const [more, setMore] = useState(true);

  useEffect(() => {
    loadData();

    return () => {
      dispatch(SET_ALL_POSTS([]));
    };
  }, []);

  const loadData = async () => {
    try {
      const data = await articlesApi.getArticlesByCategory(
        (scrollPage - 1) * 3,
        3,
        sort,
        location.pathname.slice(1)
      );

      dispatch(SET_ALL_POSTS([...allPosts, ...data]));
      setScrollPage((prevState) => prevState + 1);

      if (allPosts.length >= postsCount && allPosts.length !== 0)
        setMore(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="articles">
        <div className="container">
          <h2 className="articles__title title">
            {location.pathname.slice(1)}
          </h2>
          {/* <Filters /> */}
          <InfiniteScroll
            className="posts__grid posts-grid"
            dataLength={allPosts.length}
            next={loadData}
            hasMore={more}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {allPosts?.map((post: Post) => (
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
      <Footer />
    </>
  );
};
