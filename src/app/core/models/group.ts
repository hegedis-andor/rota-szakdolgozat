export interface Group {
  id?: string;
  name: string;
  subgroups: Subgroup[];
}

export interface Subgroup {
  id?: string;
  name: string;
}
