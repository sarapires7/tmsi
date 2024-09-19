export interface Changes {
  id: string;
  issue: string;
  keys_unmodified: string[];
  keys_modified: string[];
}

export interface ProjectDetailProps {
  id: string;
  name: string;
  keys: Key[];
}

export interface PointOfContact {
  id: string;
  name: string;
  username: string;
  gravatarUid: string;
}

export interface Space {
  id: string;
  name: string;
  projectsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Key {
  id: string;
  translation: string;
}

export interface Keys {
  id: string;
  keys: Key[];
  filter: string;
}

export interface FilterKeysProps {
  filter: string;
  label: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Account {
  createAt: string;
  id: number;
  name: string;
  slug: string;
  updateAt: string;
}

export interface Projects {
  account: Account;
  createAt: string;
  id: number;
  name: string;
  slug: string;
  updateAt: string;
}