import React, { useState } from "react";
import HomeWrapper, { AnimeListWrapper, Pagination } from "./HomeStyle";
import { useQuery } from "@apollo/client";
import { INITIAL_ANIME_LOAD } from "../../../helper/GraphQLQueries";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Categories from "../../sub_components/Categories/Categories";

const Home = () => {
  const [season, setSeason] = useState("SPRING");
  const [page, setPage] = useState(0);

  const { loading, error, data } = useQuery(INITIAL_ANIME_LOAD, {
    variables: { page: page + 1, season: season },
  });

  if (loading)
    return (
      <HomeWrapper>
        <h2>{season} 2022 Animes </h2>
        <h4>Loading.....</h4>
      </HomeWrapper>
    );
  if (error)
    return (
      <HomeWrapper>
        <h2>{season} 2022 Animes </h2>
        <h4>Error: {error.message}</h4>
      </HomeWrapper>
    );

  const {
    Page: { media: animes },
  } = data;

  const changeSeason = (season) => {
    setSeason(season);
  };

  const handlePageChange = (event) => {
    console.log(`page selected ${event.selected}`);
    setPage(event.selected);
  };

  return (
    <HomeWrapper>
      <h2>{season} 2022 Animes</h2>

      <Categories changeSeason={changeSeason} season={season} />

      <ul>
        {animes.map((anime, index) => (
          <AnimeListWrapper key={index}>
            <img src={anime.coverImage.extraLarge} alt="anime cover" />

            <div className="anime-info">
              <h3>{anime.title.romaji}</h3>

              <p>
                {anime.status === "RELEASING"
                  ? "ONGOING"
                  : anime.status === "NOT_YET_RELEASED"
                  ? "COMING SOON"
                  : anime.status}
              </p>

              {anime.status === "FINISHED" && <p>Episodes: {anime.episodes}</p>}

              {anime.nextAiringEpisode != null ? (
                <p>Episode: {anime.nextAiringEpisode.episode}</p>
              ) : (
                ""
              )}

              <Link to="#">More info...</Link>
            </div>
          </AnimeListWrapper>
        ))}
      </ul>

      <Pagination>
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={4}
          pageCount={10}
          previousLabel="<"
          nextLabel=">"
          onPageChange={handlePageChange}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={page}
        />
      </Pagination>
    </HomeWrapper>
  );
};

export default Home;
