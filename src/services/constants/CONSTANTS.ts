export const PRODUCTS_PER_PAGE_LIMIT = 15
export const TABLE_PER_PAGE_LIMIT = 10
export const PRODUCTS_PER_PAGE_MAX_LIMIT = 150
export const LOCAL_STORAGE_LANGUAGE = 'lang'
export const ERROR_IMAGE = '/images/no-image.jpg'
export const AUTH_SESSION_ID = '_AUTH_SESSION_ID'
export const AUTH_COOKIE_TOKEN = '_AUTH_TOKEN'
export const SEARCH_PARAMS_NAMES = {
  page: 'page',
  limit: 'limit',
  search: 'q',
  filter: 'f',
  c_filter: 'cf',
  c_filter_search: 'cfq',
  availability: 'av',
  category_slug: 'catg',
  brand_code: 'b_code',
  brand_ids: 'b_ids',
  stars: 'r',
  min_price: 'min_p',
  max_price: 'max_p',
  sub_category: 'sc',
  price: 'p',
  brand: 'b',
  sort: 's',
  host: 'host',
  tab: 'tab',
  status: 'status',
  collection_name: 'col_n',
  attr_name: 'atr_n',
  attr_value: 'atr_q',
  attr_operator: 'att_o',
  attr_collection: 'att_c',
  sort_col: 's_c',
  sort_type: 's_t',
  linked: 'lk',
  log: 'lg',
  event: 'ev',
  start_date: 'st_date',
  end_date: 'en_date',
  num_users_start: 'num_users_start',
  num_users_end: 'num_users_end',
  channel: 'ch',
  from: 'from',
  to: 'to',
  searchType: 'search_type',
  toggle_password: 't_p',
  view: 'vw'
}

// = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{6,}$/;
// eslint-disable-next-line no-useless-escape
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>\/?[\]\\\|]).{8,}$/

export const AUTH_TOKEN_ID = 'AUTH_TOKEN_ID'
export const GLOBAL_DATE_FORMAT = 'YYYY-MM-DD'