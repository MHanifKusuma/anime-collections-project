import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link, useParams } from "react-router-dom";
import { Button } from "../MainStyle";
import CollectionDetailWrapper, {
  AnimeListWrapper,
} from "./CollectionDetailStyle";

const CollectionDetail = () => {
  const { collectionName } = useParams();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [removedAnime, setRemovedAnime] = useState(false);

  const openDeleteModal = (animeId) => {
    setRemovedAnime(animeId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const removeAnime = () => {
    const getCollection = JSON.parse(localStorage.getItem("collections"));

    const findIndex = getCollection.animeCollections.findIndex(
      (find) => find.collectionName === collectionName
    );
    const animes = getCollection.animeCollections[findIndex].animes;

    const removeAnime = animes.findIndex(
      (remove) => remove.id === removedAnime
    );

    animes.splice(removeAnime, 1);

    localStorage.setItem("collections", JSON.stringify(getCollection));
    closeDeleteModal();
  };

  const getCollection = JSON.parse(localStorage.getItem("collections"));

  const findIndex = getCollection.animeCollections.findIndex(
    (find) => find.collectionName === collectionName
  );
  const animes = getCollection.animeCollections[findIndex].animes;

  return (
    <CollectionDetailWrapper>
      <h2>
        My Collection -{">"} {collectionName}
      </h2>

      {animes.length > 0 ? (
        animes.map((anime, index) => (
          <AnimeListWrapper key={index}>
            <img src={anime.banner} alt="anime banner" />
            <div className="anime-info">
              <p>{anime.title}</p>
              <Link to={`/anime-detail/${anime.id}/${anime.title}`}>
                More info...
              </Link>

              <Button onClick={() => openDeleteModal(anime.id)}>Remove</Button>
            </div>
          </AnimeListWrapper>
        ))
      ) : (
        <p>
          No anime in this collection yet. Go Explore{" "}
          <Link to="/">Anillections</Link>!
        </p>
      )}

      <Modal
        isOpen={deleteModalOpen}
        className="collection-modal"
        overlayClassName="collection-modal-overlay"
        onRequestClose={closeDeleteModal}
      >
        <div className="collection-modal-header">
          <h3>Remove anime from collection?</h3>
          <p>This process can't be undone</p>
          <Button className="danger" onClick={removeAnime}>
            Delete
          </Button>
        </div>
      </Modal>
    </CollectionDetailWrapper>
  );
};

export default CollectionDetail;
