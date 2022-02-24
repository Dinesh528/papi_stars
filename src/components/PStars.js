import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function PStars() {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPStars();
  }, []);

  const getPStars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://papi-pornstarsapi.p.rapidapi.com/pornstars/`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "papi-pornstarsapi.p.rapidapi.com",
          "x-rapidapi-key": "666537c443mshdd59dcbefcc514bp1d4c78jsna537fc0b08c0",
        },
      });
      const json = await response.json();
      console.log(json.results);

      setStars(await json.results);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const Loading = () => {
    return <div className="text-center">Loading...</div>;
  };

  const fetchStars = async (currentPage) => {
    const res = await fetch(
      `https://papi-pornstarsapi.p.rapidapi.com/pornstars/?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "papi-pornstarsapi.p.rapidapi.com",
          "x-rapidapi-key": "666537c443mshdd59dcbefcc514bp1d4c78jsna537fc0b08c0",
        },
      }
    );
    const data = await res.json();
    return data.results;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;
    const starsFromServer = await fetchStars(currentPage);
    setStars(starsFromServer);
  };
  const ShowStars = () => {
    return (
      <div className="row m-2">
        {stars.map((star) => {
          return (
            <div key={star.id} className="col-sm-6 col-md-3 v my-2">
              <div className="card h-100  p-4 border-primary" key={star.id}>
                <div className="card-body">
                  <p className="float-end badge rounded-pill bg-primary">{star.age}</p>
                  <h5 className="card-title mb-4">Name: {star.name}</h5>
                  <p className="card-text lead">
                    Ethnicity: {star.ethnicity ? star.ethnicity : "NA"}
                  </p>
                  <p className="card-text lead fw-bold">Country: {star.nationality}</p>

                  <a
                    href={`${star.pornpics_link}`}
                    style={{ textDecoration: "none" }}
                    className="d-grid gap-2"
                    target="_blank"
                  >
                    <button className="btn btn-outline-primary">Go to website</button>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container-fluid my-3 py-2">
      <div className="row">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={500}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
        <div>{loading ? <Loading /> : <ShowStars />}</div>

        <div className="col-md-12">
          {/* <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={500}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default PStars;
