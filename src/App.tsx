import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { useCard, useCardList } from "./hooks";

function App() {
  return (
    <Provider store={store}>
      <CardContainer />
    </Provider>
  );
}

function CardContainer() {
  const { cards, loadNextPage, hasNextPage, isLoading } = useCardList();
  return (
    <div className="card-container">
      {cards.map((card: number) => (
        <CardComponent id={card} />
      ))}
      {hasNextPage && <button onClick={loadNextPage}>Next Page</button>}
      {isLoading && <span>Loading...</span>}
    </div>
  );
}

function CardComponent(props: { id: number }) {
  const card = useCard(props.id);
  if (!card) return null;
  return (
    <div className="card">
      <div>
        {card.id} - {card.firstname} {card.lastname}
      </div>
      <div>
        {card.make} {card.model}
      </div>
    </div>
  );
}

export default App;
