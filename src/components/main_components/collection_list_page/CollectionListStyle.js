import styled from "@emotion/styled";

const CollectionListWrapper = styled.section`
  padding: 20px;

  .collection-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const CollectionCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;

  .collection-card {
    max-width: 40%;
    padding: 5%;
    transition: all 0.15s ease-in-out;

    @media only screen and (min-width: 768px) {
      max-width: 20%;
    }
    @media only screen and (min-width: 991px) {
      max-width: 15%;
    }
    @media only screen and (min-width: 1024px) {
      max-width: 10%;
    }
    img {
      max-width: 100%;
    }

    &:hover {
      box-shadow: 1px 1px 10px rgba(125, 120, 155, 0.75);
    }

    button {
      margin: 0;
      background-color: rgba(254, 130, 130, 1);
      cursor: pointer;
    }
  }
  a {
    text-decoration: none;
  }
`;

export default CollectionListWrapper;
