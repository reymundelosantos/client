import { Pagination } from "react-bootstrap";
import PropTypes from 'prop-types'

const JokeList = ({ jokes, itemsPerPage, currentPage, onPageChange }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJokes =
    jokes.length > 0 ? jokes?.slice(startIndex, endIndex) : [];

  const totalPageCount = Math.ceil(jokes.length / itemsPerPage);
  const maxPaginationItems = 10;

  const renderPaginationItems = () => {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPaginationItems / 2)
    );
    const endPage = Math.min(
      totalPageCount,
      startPage + maxPaginationItems - 1
    );

    return Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
      <Pagination.Item
        key={startPage + index}
        active={startPage + index === currentPage}
        onClick={() => onPageChange(startPage + index)}
      >
        {startPage + index}
      </Pagination.Item>
    ));
  };

  return (
    <div className=" mt-4">
      {currentJokes.map((joke) => (
        <div key={joke.id} className="card mb-3 p-3">
          <p className="card-text text-start">
            <small className="text-muted">{joke?.created_at}</small>
          </p>
          <div className="card-body">
            <p className="card-text">{joke.value}</p>
          </div>
        </div>
      ))}
      {jokes.length > 10 ? (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() =>
              onPageChange(Math.min(totalPageCount, currentPage + 1))
            }
          />
        </Pagination>
      ) : <></>}
    </div>
  );
};

JokeList.propTypes = {
  jokes: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired,
}

export default JokeList;
