export enum LocaleOptions {
  ko = 'ko-KR',
  en = 'en-US'
}
export enum LocalStorageKey {
  localeKey = 'VUE_TSX_ADMIN_LOCALE',
  loginFormKey = 'VUE_TSX_ADMIN_LOGIN_FORM_INFO',
  tokenKey = 'VUE_TSX_ADMIN_TOKEN'
}
export enum AppTheme {
  light = 'light',
  dark = 'dark'
}

export enum ApplicationInfo {
  appTitle = import.meta.env.VITE_APP_TITLE
}

// component name
// route name
// keepalive require component name to same
export enum ViewNames {
  login = 'login',
  redirect = 'redirect',
  notFound = 'notFound',

  // =============== DIVIDER ==================
  board = 'board',

  centerBoard = 'centerBoard',
  customBoard = 'customBoard',

  // =============== DIVIDER ==================
  schedule = 'schedule',

  scheduleAll = 'scheduleAll',
  scheduleMe = 'scheduleMe',

  // =============== DIVIDER ==================
  management = 'management',

  manageUser = 'manageUser',
  consulting = 'consulting',

  // =============== DIVIDER ==================
  service = 'service',

  serviceMonth = 'serviceMonth',
  serviceDaily = 'serviceDaily',
  serviceVoucher = 'serviceVoucher',

  // =============== DIVIDER ==================
  admin = 'admin',

  adminTeacher = 'adminTeacher',
  adminProgram = 'adminProgram',
  adminVoucher = 'adminVoucher',

  // =============== DIVIDER ==================
  cs = 'cs',

  csFaq = 'csFaq',
  csQna = 'csQna',

  // =============== DIVIDER ==================
  dashboard = 'dashboard',

  workplace = 'workplace',
  monitor = 'monitor',

  // =============== DIVIDER ==================

  exception = 'exception',

  _403 = '403',
  _404 = '404',
  _500 = '500',

  // =============== DIVIDER ==================
  form = 'form',

  step = 'step',
  group = 'group',
  // =============== DIVIDER ==================
  profile = 'profile',

  // =============== DIVIDER ==================

  list = 'list',

  searchTable = 'searchTable',
  cardList = 'cardList',
  // =============== DIVIDER ==================
  result = 'result',

  success = 'success',
  error = 'error',

  // =============== DIVIDER ==================

  user = 'user',

  info = 'info',
  setting = 'setting'

  // =============== DIVIDER ==================
}

export const layoutStyleConfig = {
  navbarHeight: 64,
  breadcrumbHeight: 52,
  tabHeight: 40,
  footerHeight: 35
} as const

export enum ResCode {
  success = 20000,
  error = 50000,
  illegalToken = 50008,
  expiredToken = 50014,
  // Other clients logged
  otherLogin = 50012
}
