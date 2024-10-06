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

export interface FilterKeysProps {
  filter: string;
  label: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ChangeProps {
  id: string;
  issue: string;
  keys_unmodified: Key[];
  keys_modified: ModificationProps[];
}

export interface ModificationProps {
  id: string;
  type: string;
  before: Key | null;
  after: Key | null;
}

export interface Key {
  id: string;
  module: string;
  breakpoints: any;
  bu: any;
  freeText: string;
  legalImplications?: boolean;
  repo: string;
  translation: string;
  screenshot?: string | null;
  translations: any
}

export interface HeaderActionsProps {
  filter: string;
  setFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDialogOpen: () => void;
  label: string;
  title: string;
}
