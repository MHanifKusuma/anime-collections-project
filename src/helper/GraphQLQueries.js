import { gql } from "@apollo/client";

export const INITIAL_ANIME_LOAD = gql`
  query InitialAnime($page: Int!, $season: MediaSeason!) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        currentPage
        perPage
        total
        hasNextPage
        lastPage
      }
      media(
        startDate_greater: 20220000
        season: $season
        sort: POPULARITY_DESC
        type: ANIME
        isAdult: false
      ) {
        id
        title {
          romaji
        }
        startDate {
          month
          year
        }
        episodes
        status
        coverImage {
          extraLarge
        }
        nextAiringEpisode {
          episode
        }
      }
    }
  }
`;

export const GET_DETAIL_ANIME = gql`
  query InitialAnime($id: Int) {
    Media(id: $id, isAdult: false) {
      id
      title {
        romaji
        english
      }
      status
      description
      startDate {
        month
        year
      }
      endDate {
        month
        year
      }
      episodes
      coverImage {
        extraLarge
      }
      nextAiringEpisode {
        episode
      }
      genres
      meanScore
    }
  }
`;
