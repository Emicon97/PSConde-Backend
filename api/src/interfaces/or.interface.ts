interface Query {
  $regex: string;
  $options: string;
}

interface Filters {
  descrip?: Query;
  linea?: Query;
  tags?: Query;
  marca?: Query;
}

export interface Or {
  $or: Filters[];
}
