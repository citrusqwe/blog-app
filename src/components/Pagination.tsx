import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { SET_CURRENT_PAGE } from '../redux/reducers/postsReducer';

const Pagination = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { pages, currentPage } = useSelector(
    (posts: RootStateOrAny) => posts.posts
  );
  const pageslist = [];
  // console.log(pageslist);

  for (let i = 0; i < pages; i++) {
    pageslist.push(i + 1);
  }

  const paginate = (n: number) => {
    dispatch(SET_CURRENT_PAGE(n));
  };

  return (
    <ul className="pagination">
      {currentPage !== 1 && (
        <div
          className="pagination__prev"
          onClick={() => paginate(currentPage - 1)}
        >
          Prev
        </div>
      )}
      {pageslist?.map((p: any) => (
        <li className="pagination__item">
          <div key={p} onClick={() => paginate(p)}>
            {p}
          </div>
          {/* <Link to={p}>{p}</Link> */}
        </li>
      ))}
      {currentPage < pageslist.length && (
        <div
          className="pagination__next"
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </div>
      )}
    </ul>
  );
};

export default Pagination;
