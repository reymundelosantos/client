import { useState, useCallback } from "react";
import { capitalize } from "lodash";
import PropTypes from 'prop-types'

const SearchBar = ({ handleCategorySearch, handleTextSearch, categories }) => {
  const [searchType, setSearchType] = useState("category");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const handleTextSearchClick = useCallback((e) => {
    e.preventDefault();
    handleTextSearch(text);
  }, [handleTextSearch, text]);

  const handleCategorySearchClick = useCallback((e) => {
    e.preventDefault();
    handleCategorySearch(category);
  }, [handleCategorySearch, category]);

  return (
    <>
      <div className="d-flex mt-5">
        <div
          className="btn-group btn-group-toggle btn-group-lg"
          role="group"
          aria-label="search-category"
        >
          <button
            type="button"
            className={`btn btn-primary ${
              searchType === "category" ? "active" : ""
            }`}
            onClick={() => setSearchType("category")}
          >
            Category
          </button>
          <button
            type="button"
            className={`btn btn-primary ${
              searchType === "free-text" ? "active" : ""
            }`}
            onClick={() => setSearchType("free-text")}
          >
            Free Text
          </button>
        </div>
      </div>
      <div className="mt-4">
        <form>
          {searchType === "free-text" ? (
            <div className="row align-items-center">
              <div className="col-auto">
                <label className="form-check-label" htmlFor="autoSizingCheck">
                  Free Text
                </label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control mb-2"
                  id="inlineFormInput"
                  placeholder="Enter a keyword"
                  value={text}
                  onChange={handleTextChange}
                />
              </div>
              <div className="col-auto my-1">
                <button type="submit" className="btn btn-primary mb-2" onClick={handleTextSearchClick}>
                  Search
                </button>
              </div>
            </div>
          ) : (
            <div className="row align-items-center">
              <div className="col-auto">
                <label className="form-check-label" htmlFor="autoSizingCheck">
                  Category
                </label>
              </div>
              <div className="col-md-6">
                <select className="form-control" onChange={handleCategoryChange} defaultValue={''}>
                  <option disabled value={''}></option>
                  {categories?.map((category) => (
                    <option key={category} value={category}>{capitalize(category)}</option>
                  ))}
                </select>
              </div>
              <div className="col-auto my-1">
                <button type="submit" className="btn btn-primary mb-2" onClick={handleCategorySearchClick}>
                  Search
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

SearchBar.propTypes = {
  categories: PropTypes.array.isRequired,
  handleCategorySearch: PropTypes.func.isRequired,
  handleTextSearch: PropTypes.func.isRequired,
}

export default SearchBar;
