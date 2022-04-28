import React, { useState } from "react";
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
import Modal from "react-modal/lib/components/Modal";
Modal.setAppElement("#root");

const AnimeDetail = () => {
  const { id } = useParams();
  const [CollectionModalOpen, setCollectionModalOpen] = useState(false);
  const [newCollectionModalOpen, setNewCollectionModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [successModal, setSuccessModal] = useState(false);

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
        <h3>Loading....</h3>
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

  const AddToCollection = () => {
    setCollectionModalOpen(true);
    console.log(`open modal click: ${CollectionModalOpen}`);
  };

  const closeCollectionModal = () => {
    setCollectionModalOpen(false);
  };

  const openNewCollectionModal = () => {
    setNewCollectionModalOpen(true);
  };

  const closeNewCollectionModal = () => {
    setNewCollectionModalOpen(false);
  };

  const openSuccessModal = () => {
    setSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setSuccessModal(false);
  };

  const handleNewCollectionNameChange = (e) => {
    setNewCollectionName(e.target.value);
    console.log(e.target.value);
  };

  const handleNewCollectionSubmit = (e) => {
    const newCollection = {
      collectionName: newCollectionName,
      collectionBanner: anime.coverImage.extraLarge,
      animes: [],
    };

    const getCollection = JSON.parse(localStorage.getItem("collections"));
    getCollection.animeCollections.push(newCollection);

    localStorage.setItem("collections", JSON.stringify(getCollection));

    e.preventDefault();

    setNewCollectionModalOpen(false);

    addAnimeToCollection(newCollection.collectionName);
  };

  const addAnimeToCollection = (collectionName) => {
    const getCollection = JSON.parse(localStorage.getItem("collections"));

    const addAnime = {
      id: anime.id,
      title: anime.title.romaji,
      banner: anime.coverImage.extraLarge,
    };

    for (var i = 0; i < getCollection.animeCollections.length; i++) {
      if (getCollection.animeCollections[i].collectionName === collectionName) {
        getCollection.animeCollections[i].animes.push(addAnime);
        console.log(getCollection.animeCollections[i]);
        localStorage.setItem("collections", JSON.stringify(getCollection));
        closeCollectionModal();
        openSuccessModal();
      }
    }
  };

  return (
    <AnimeDetailWrapper id="animeDetail">
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

        <div className="collection">In collection:</div>
      </DetailInfo>

      <div className="addToCollection">
        <Button onClick={AddToCollection}>Add to Collection</Button>
      </div>

      <Modal
        isOpen={CollectionModalOpen}
        className="collection-modal"
        overlayClassName="collection-modal-overlay"
        onRequestClose={closeCollectionModal}
      >
        <div className="collection-modal-header">
          <h3>Add anime to a collection!</h3>
          <p>{anime.title.romaji}</p>
        </div>

        <hr />

        <div className="collection-modal-list">
          {JSON.parse(localStorage.getItem("collections")).animeCollections
            .length > 0 ? (
            JSON.parse(
              localStorage.getItem("collections")
            ).animeCollections.map((collection, index) => (
              <div
                className="collection-modal-item"
                key={index}
                onClick={() => addAnimeToCollection(collection.collectionName)}
              >
                <img
                  src={collection.collectionBanner}
                  alt="collection banner"
                />
                <p>{collection.collectionName}</p>
              </div>
            ))
          ) : (
            <p>No collection yet</p>
          )}
        </div>

        <hr />

        <div className="collection-modal-footer">
          <p>Or add to anime to a new collection!</p>
          <Button onClick={openNewCollectionModal}>Make new collection</Button>
        </div>
      </Modal>
      <Modal
        isOpen={newCollectionModalOpen}
        className="collection-modal"
        overlayClassName="collection-modal-overlay"
        onRequestClose={closeNewCollectionModal}
      >
        <div className="collection-modal-header">
          <h3>Please insert new collection name</h3>
          <form onSubmit={handleNewCollectionSubmit}>
            <input
              type="text"
              autoFocus
              onChange={handleNewCollectionNameChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={successModal}
        className="collection-modal"
        overlayClassName="collection-modal-overlay"
        onRequestClose={closeSuccessModal}
      >
        <div className="collection-modal-header">
          <h3>Add anime to collection success!</h3>
        </div>
      </Modal>
    </AnimeDetailWrapper>
  );
};

export default AnimeDetail;
