import styled from "@emotion/styled";

const AnimeDetailWrapper = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;

  img {
    max-width: 300px;
    margin: auto;
  }

  h4 {
    margin-top: 0;
  }

  h2,
  h4 {
    text-align: center;
  }

  .addToCollection {
    margin: auto;
    margin-top: 30px;
  }
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  .genres {
    p {
      display: inline-block;
    }
  }

  .score {
    p {
      display: inline-block;
    }
  }

  .description {
    margin-top: 50px;

    h4 {
      text-align: start;
    }
  }
`;

export default AnimeDetailWrapper;
