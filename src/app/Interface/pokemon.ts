export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
  };
  types: { type: { name: string } }[];
  species: { name: string; url: string };
  color: string;
  height: number;
  weight: number;
}

export interface PokeRequisition {
  count: number;
  results: [{ name: string; url: string }];
}
