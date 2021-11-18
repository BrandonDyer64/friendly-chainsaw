import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "./api";
import { addCard, addCards } from "./cardSlice";
import { RootState } from "./store";

export function useCardList(): {
  cards: number[];
  loadNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
} {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page === undefined) return;
    setIsLoading(true);
    API.listCards(page).then((pagedCards) => {
      dispatch(addCards(pagedCards.items));
      setNextPage(pagedCards.next);
      setCards((cards) => [...cards, ...pagedCards.items.map((c) => c.id)]);
      setIsLoading(false);
    });
  }, [page]);

  function loadNextPage() {
    if (nextPage !== undefined) {
      setNextPage(undefined);
      setPage(nextPage);
    }
  }

  return {
    cards,
    loadNextPage,
    hasNextPage: nextPage !== undefined,
    isLoading,
  };
}

export function useCard(id: number): Card | undefined {
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) => state.cards.cards[id]) as
    | Card
    | undefined;

  useEffect(() => {
    if (!card) {
      API.getCard(id).then((card) => dispatch(addCard(card)));
    }
  }, [card?.id]);

  return card;
}
