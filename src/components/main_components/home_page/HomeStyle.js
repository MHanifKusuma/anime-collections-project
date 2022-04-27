import styled from "@emotion/styled";

const HomeWrapper = styled.section`
  padding: 20px;

  img {
    max-width: 150px;
  }

  ul {
    padding: 0;
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
  }
`;

export const Pagination = styled.nav`
  ul {
    display: flex;
    justify-content: space-between;
    li {
      list-style-type: none;
      border-radius: 50%;
      min-width: 35px;
      min-height: 25px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &.active {
        background-color: rgba(180, 254, 231, 0.8);

        a {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
`;

export default HomeWrapper;
