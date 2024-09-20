export interface Account {
  id: string;
  name: string;
  slug:string;
  createdAt: string;
  updateddAt: string;
}

export interface Projects {
  account: Account;
  id: number;
  name: string;
  slug: string;
  mainFormat?: string;
  pointOfContact?: PointOfContact;
  createAt: string;
  updateAt: string;
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
  keys: Key[];
  filter: string;
}

export interface FilterKeysProps {
  filter: string;
  label: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ChangeProps {
  changes: ChangeProps[];
}

export interface ChangeProps {
  id: string;
  issue: string;
  keys_unmodified: string[];
  keys_modified: ModificationProps[];
}

export interface ModificationProps {
  type: string;
  before: { key: string, value: string };
  after: { key: string, value: string };
}

