export type Opts = {
  page: number;
  limit: number;
  replaceAll: boolean;
};

export type PaginateProps = {
  count: number;
  setOpts: Function;
  opts: Opts;
  className?: string;
};
