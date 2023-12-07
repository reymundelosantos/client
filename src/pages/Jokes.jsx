import {  useState } from "react";
import { useQuery } from "react-query";
import SearchBar from "../components/SearchBar";
import { getCategories, searchJokes, getRandomJoke, getJokesByCategory } from "../services/api";
import JokeList from "../components/JokeList";

const Jokes = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: "category",
    queryFn: getCategories,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the desired number of jokes per page

  const handleCategorySearch = async (category) => {
    if (!category) {
      const joke = await getRandomJoke();
      const jokes = Array.isArray(joke) ? joke : [joke];
      setSearchResults(jokes);
    } else {
      const result = await getJokesByCategory(category);
      const jokes = Array.isArray(result) ? result : [result];
      setSearchResults(jokes);
    }
    setCurrentPage(1);
  }

  const handleTextSearch = async (text) => {
    if (!text) {
      const joke = await getRandomJoke();
      const jokes = Array.isArray(joke) ? joke : [joke];
      setSearchResults(jokes);
    } else {
      const { result } = await searchJokes(text);
      const jokes = Array.isArray(result) ? result : [result];
      setSearchResults(jokes);
    }
    setCurrentPage(1);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Fetch additional data if needed based on the new page number
  };

  
  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Chuck Norris Jokes</h1>
        <SearchBar
          categories={categories}
          handleCategorySearch={handleCategorySearch}
          handleTextSearch={handleTextSearch}
        />
         <JokeList
          jokes={searchResults}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Jokes;
