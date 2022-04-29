import styled from "@emotion/styled";

const CollectionDetailWrapper = styled.section`
  padding: 20px;

  img {
    max-width: 150px;
  }

  ul {
    padding: 0;
  }
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    margin: 0;
    margin-top: 20px;
    background-color: rgba(254, 130, 130, 1);
    cursor: pointer;
  }
`;

export const AnimeListWrapper = styled.div`
  display: flex;
  padding: 15px;
  margin: 30px 0;
  /* border: 1px solid rgba(255, 255, 255, 0.1); */
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(224, 218, 190, 1);

  .anime-info {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
export default CollectionDetailWrapper;
