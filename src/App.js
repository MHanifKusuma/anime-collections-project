import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import MainComponent from "./components/main_components/MainComponent";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://graphql.anilist.co/",
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
