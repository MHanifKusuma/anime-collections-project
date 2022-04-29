import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { Link } from "react-router-dom";
import { Button } from "../MainStyle";
import CollectionListWrapper, {
  CollectionCardWrapper,
} from "./CollectionListStyle";
import default_collection_image from "../../../images/default_collection_img.webp";

const CollectionList = () => {
  const [newCollectionModalOpen, setNewCollectionModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [removedCollection, setRemovedCollection] = useState(false);

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

  const openDeleteModal = (collectionName) => {
    setRemovedCollection(collectionName);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleNewCollectionNameChange = (e) => {
    setNewCollectionName(e.target.value);
  };

  const handleNewCollectionSubmit = (e) => {
    const newCollection = {
      collectionName: newCollectionName,
      collectionBanner: default_collection_image,
      animes: [],
    };

    const getCollection = JSON.parse(localStorage.getItem("collections"));
    const checkName = getCollection.animeCollections.filter((value) => {
      if (value.collectionName === newCollection.collectionName) {
        return value;
      }
      return null;
    });

    if (checkName.length === 0) {
      getCollection.animeCollections.push(newCollection);

      localStorage.setItem("collections", JSON.stringify(getCollection));

      e.preventDefault();

      setNewCollectionModalOpen(false);
      openSuccessModal();
    } else {
      alert("Collection already exist");
      e.preventDefault();
    }
  };

  const removeCollection = () => {
    const getCollection = JSON.parse(localStorage.getItem("collections"));

    const removingIndex = getCollection.animeCollections.findIndex(
      (remove) => remove.collectionName === removedCollection
    );

    getCollection.animeCollections.splice(removingIndex, 1);

    localStorage.setItem("collections", JSON.stringify(getCollection));
    closeDeleteModal();
  };

  return (
    <CollectionListWrapper>
      <div className="collection-header">
        <h2>My Collections</h2>
        <Button onClick={openNewCollectionModal}>Add new</Button>
      </div>

      <CollectionCardWrapper>
        {JSON.parse(localStorage.getItem("collections")).animeCollections
          .length > 0 ? (
          JSON.parse(localStorage.getItem("collections")).animeCollections.map(
            (collection, index) => (
              <div key={index} className="collection-card">
                <Link
                  key={index}
                  to={`/my-collections/collection-detail/${collection.collectionName}`}
                >
                  <div>
                    <img
                      src={collection.collectionBanner}
                      alt="collection banner"
                    />
                    <p>{collection.collectionName}</p>
                  </div>
                </Link>
                <Button
                  onClick={() => openDeleteModal(collection.collectionName)}
                >
                  Remove
                </Button>
              </div>
            )
          )
        ) : (
          <p>No collection yet</p>
        )}
      </CollectionCardWrapper>

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
          <h3>Add new collection success!</h3>
        </div>
      </Modal>
      <Modal
        isOpen={deleteModalOpen}
        className="collection-modal"
        overlayClassName="collection-modal-overlay"
        onRequestClose={closeDeleteModal}
      >
        <div className="collection-modal-header">
          <h3>Delete this collection?</h3>
          <p>This process can't be undone</p>
          <Button className="danger" onClick={removeCollection}>
            Delete
          </Button>
        </div>
      </Modal>
    </CollectionListWrapper>
  );
};

export default CollectionList;
