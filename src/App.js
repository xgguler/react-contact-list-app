import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [obj, setObj] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(30);

  // ...

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = obj.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(obj.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const { data } = await axios.get("/api/contact-list");
        setObj(data.contactList);
      } catch (err) {
        console.log(err);
      }
    };

    getAllContacts();
  }, [currentPage, search]);

  return (
    <div className="container">
      <div className="head">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => {
            setSearch(event.target.value)
          }
          }
        />
      </div>
      {obj ? (
        <div className="blog-content-section">
          <div className="blog-container">
            {currentPosts.filter(currentPost => {
              if (search === '') {
                return currentPost;
              } else if (currentPost.name.toLowerCase().includes(search.toLowerCase())) {
                return currentPost;
              }
            }).map((currentPost, index) => (
              <div key={index}>
                <img className="cover-img" src={currentPost.url} alt="" />
                <h2 className="title">{currentPost.name}</h2>
              </div>
            )
            )}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={obj.length}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}

export default App;