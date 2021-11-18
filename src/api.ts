export async function listCards(page: number = 0): Promise<Paged<Card>> {
  await sleep(1000);
  return {
    items: Array(10)
      .fill(0)
      .map((_, i) => getCardRaw(i + page * 10)),
    next: page < 9 ? page + 1 : undefined,
  };
}

export async function getCard(id: number): Promise<Card> {
  await sleep(1000);
  return getCardRaw(id);
}

function getCardRaw(id: number): Card {
  const make = rand(Object.keys(MAKEMODEL)) as keyof typeof MAKEMODEL;
  return {
    id,
    firstname: rand(FIRSTNAMES),
    lastname: rand(LASTNAMES),
    make,
    model: rand(MAKEMODEL[make]),
  };
}

const rand = <T>(array: T[]): T => array[(array.length * Math.random()) | 0];

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const FIRSTNAMES = [
  "Alice",
  "Alex",
  "Andre",
  "Andrew",
  "Bob",
  "Bill",
  "Billy",
  "Brandon",
  "Bryan",
  "Carmon",
  "Chris",
  "Carol",
  "Cindy",
  "David",
  "Darcie",
  "Donnah",
  "Elizabeth",
  "Emma",
  "Fiona",
  "George",
  "Herold",
  "Isaac",
  "Josh",
  "Kim",
  "Liz",
  "Martha",
  "Ned",
  "Owen",
  "Pat",
  "Quinn",
  "Rose",
  "Sam",
  "Tim",
  "William",
];

const LASTNAMES = [
  "Anderson",
  "Brown",
  "Davis",
  "Garcia",
  "Gonzales",
  "Jones",
  "Lopez",
  "Martinez",
  "Miller",
  "Moore",
  "Smith",
  "Thomas",
  "Walker",
  "Williams",
  "Wilson",
];

const MAKEMODEL = {
  Ford: ["Fiesta", "Focus", "F-100", "F-150"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
  Toyota: ["Avalon", "Camry", "Corolla", "Prius", "Sienna"],
  Chevrolet: ["Tahoe", "Trailblazer", "Trax", "Equinox"],
};
