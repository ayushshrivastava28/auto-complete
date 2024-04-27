import React, { useState, useEffect, ChangeEvent } from "react";
import { debounce } from "../../utils/debounce";
import { fetchSuggestions } from "../../utils/api";
import { Product } from "../../types";
import "./styles.css";

const AutoComplete: React.FC = () => {
  // State variables for managing search results, user input, loading state, and visibility of autocomplete results
  const [products, setProducts] = useState<Product[]>([]); // Stores search results
  const [text, setText] = useState(""); // Stores user input
  const [showResults, setShowResults] = useState(false); // Controls visibility of autocomplete results
  const [loading, setLoading] = useState(false); // Indicates whether data is being fetched
  const [selected, setSelected] = useState(false); // Tracks whether a suggestion has been selected

  useEffect(() => {
    // Function to fetch suggestions and update state based on user input
    const fetchSuggestionsAndUpdateState = () => {
      // Check if there is user input and no suggestion has been selected
      if (text.length > 0 && !selected) {
        setLoading(true);
        debounce(() => {
          fetchSuggestions(text) // Fetch suggestions from the API
            .then((data) => {
              const filteredData = data.products
                .filter((product) =>
                  product.title.toLowerCase().includes(text.toLowerCase())
                )
                .slice(0, 10); // Limit the number of suggestions to 10
              setProducts(filteredData);
              setShowResults(true);
            })
            .catch((err) => {
              console.log("Error fetching suggestions:", err);
              setProducts([]);
              setShowResults(false);
            })
            .finally(() => {
              setLoading(false);
            });
        }, 500)();
      } else {
        setProducts([]);
        setShowResults(false);
      }
    };

    fetchSuggestionsAndUpdateState(); // Call the function to fetch suggestions and update state
  }, [text, selected]);

  // Event handler for handling changes in user input
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setSelected(false);
  };

  // Event handler for handling suggestion selection on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && products.length > 0) {
      setText(products[0].title);
      setSelected(true);
      setShowResults(false);
    }
  };

  // Event handler for showing autocomplete results on mouse enter
  const handleMouseEnter = () => {
    setShowResults(true);
  };

  // Event handler for hiding autocomplete results on mouse leave
  const handleMouseLeave = () => {
    setShowResults(false);
  };

  // Function to highlight matched text in the product titles
  const highlightMatch = (name: string) => {
    const regex = new RegExp(`(${text})`, "gi"); // Regular expression for case-insensitive match
    const parts = name.split(regex); // Split the title into parts based on matches
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span className="highlight" key={index}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Function to render autocomplete suggestions list
  const autoCompleteResult = () => {
    // Return null if autocomplete results should not be shown
    if (!showResults) return null;

    // Show "No suggestions found" message if no results found and there is user input
    if (products.length === 0 && text.length > 0) {
      return (
        <ul
          className="suggestions-list"
          role="listbox"
          aria-labelledby="search-label"
        >
          <li className="suggestions-item" role="option">
            {highlightMatch("No suggestions found")}
          </li>
        </ul>
      );
    }

    // Render the list of autocomplete suggestions
    return (
      <ul
        className="suggestions-list"
        role="listbox"
        aria-labelledby="search-label"
      >
        {products.map((product) => (
          <li
            className="suggestions-item"
            role="option"
            key={product.id}
            onClick={() => handleSuggestionClick(product.title)}
          >
            {highlightMatch(product.title)}
          </li>
        ))}
      </ul>
    );
  };

  // Event handler for handling suggestion selection
  const handleSuggestionClick = (title: string) => {
    setText(title);
    setSelected(true);
    setShowResults(false);
  };

  // Component for rendering the loading indicator
  const Loader = () => <div className="loader"></div>;

  // Render the AutoComplete component
  return (
    <section
      className="autocomplete-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        type="text"
        value={text}
        placeholder="Search products..."
        onChange={onChange}
        onKeyDown={handleKeyDown}
        id="search-input"
        aria-autocomplete="list"
        aria-controls="autocomplete-results"
        aria-expanded={showResults && products.length > 0} // ARIA attribute for indicating whether results are expanded
        role="combobox"
      />
      <span className="search-icon">&#128269;</span>
      {loading ? <Loader /> : text.length > 0 && autoCompleteResult()}
    </section>
  );
};

export default AutoComplete;
