type Card = {
  id: number;
  firstname: string;
  lastname: string;
  make: string;
  model: string;
};

type Paged<T> = {
  items: T[];
  next?: number;
};
