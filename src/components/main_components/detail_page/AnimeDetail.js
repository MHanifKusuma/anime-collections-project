import React from "react";
import { useParams } from "react-router-dom";
import AnimeDetailWrapper, { DetailInfo } from "./AnimeDetailStyle";
import { GET_DETAIL_ANIME } from "../../../helper/GraphQLQueries";
import { useQuery } from "@apollo/client";
import { Button } from "../MainStyle";
import { Icon } from "react-icons-kit";
import { grin } from "react-icons-kit/icomoon/grin";
import { smile } from "react-icons-kit/icomoon/smile";
import { neutral } from "react-icons-kit/icomoon/neutral";
import { wondering } from "react-icons-kit/icomoon/wondering";
import { sad } from "react-icons-kit/icomoon/sad";

const AnimeDetail = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_DETAIL_ANIME, {
    variables: { id: id },
  });

  if (error)
    return (
      <AnimeDetailWrapper>
        <h3>Error: Anime not found</h3>
      </AnimeDetailWrapper>
    );
  if (loading)
    return (
      <AnimeDetailWrapper>
        <h3>Loading....</h3>;
      </AnimeDetailWrapper>
    );

  const { Media: anime } = data;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const startDate = new Date(anime.startDate.year, anime.startDate.month - 1);
  const endDate = anime.endDate.month
    ? new Date(anime.endDate.year, anime.endDate.month - 1)
    : null;

  return (
    <AnimeDetailWrapper>
      <img src={anime.coverImage.extraLarge} alt="anime cover img" />

      <h2>{anime.title.romaji}</h2>
      {anime.title.english && (
        <h4>
          <i>{anime.title.english}</i>
        </h4>
      )}

      <DetailInfo>
        <div className="genres">
          <p>Genres: &nbsp;</p>
          {anime.genres.map((genre, index, { length }) =>
            length - 1 === index ? (
              <p key={index}>{genre}</p>
            ) : (
              <p key={index}>{genre}, &nbsp;</p>
            )
          )}
        </div>

        <p className="dates">
          Date aired: {months[startDate.getMonth()]}, {startDate.getFullYear()}{" "}
          -&nbsp;
          {endDate
            ? `${months[endDate.getMonth()]}, ${endDate.getFullYear()}`
            : " ?"}
        </p>

        <p className="status">
          Status:{" "}
          {anime.status === "RELEASING"
            ? "Ongoing"
            : anime.status === "NOT_YET_RELEASED"
            ? "Coming Soon"
            : anime.status === "FINISHED"
            ? "Finished"
            : anime.status === "CANCELLED"
            ? "Cancelled"
            : "Hiatus"}
        </p>

        <p className="episodes">
          Episodes : {anime.episodes || anime.nextAiringEpisode.episode}
        </p>

        <div className="score">
          <p>User score: &nbsp;</p>

          {anime.meanScore > 80 ? (
            <p>
              {anime.meanScore}% &nbsp;
              <span>
                <Icon icon={grin} size={25} />
              </span>
            </p>
          ) : anime.meanScore > 50 ? (
            <p>
              {anime.meanScore}% &nbsp;
              <span>
                <Icon icon={smile} size={25} />
              </span>
            </p>
          ) : anime.meanScore < 50 ? (
            <p>
              {anime.meanScore}% &nbsp;
              <span>
                <Icon icon={wondering} size={25} />
              </span>
            </p>
          ) : anime.meanScore < 30 ? (
            <p>
              {anime.meanScore}% &nbsp;
              <span>
                <Icon icon={sad} size={25} />
              </span>
            </p>
          ) : (
            <p>
              {anime.averageScore}% &nbsp;
              <span>
                <Icon icon={neutral} size={25} />
              </span>
            </p>
          )}
        </div>

        <div className="description">
          <h4>Description: </h4>
          <p dangerouslySetInnerHTML={{ __html: anime.description }}></p>
        </div>

        <div className="collection">
          In collection:
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </DetailInfo>

      <div className="addToCollection">
        <Button>Add to Collection</Button>
      </div>
    </AnimeDetailWrapper>
  );
};

export default AnimeDetail;
