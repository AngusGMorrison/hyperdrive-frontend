export const BANNER_TYPES = {
  ERROR: "error"
}

export const FIELD_TYPES = {
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email"
}

export const HOMEPAGE_FORMS = {
  SIGN_IN: 'sign in',
  REGISTER: 'register'
}

export const ICONS = {
  ACCOUNT_CIRCLE: {
    BLUE: '/icons/ic_account_circle_blue.svg',
    MAGENTA: '/icons/ic_account_circle_magenta.svg'
  },
  CLOUD_OFF: {
    DARK: '/icons/ic_cloud_off_dark.svg'
  },
  KEY: {
    BLUE: '/icons/ic_key_blue.svg',
    MAGENTA: '/icons/ic_key_magenta.svg'
  },
  MAIL: {
    BLUE: '/icons/ic_mail_blue.svg',
    MAGENTA: '/icons/ic_mail_magenta.svg'
  },
  THUMBS_UP: {
    DARK: '/icons/ic_thumb_up_dark.svg',
  },
  SORT: {
    YELLOW: '/icons/ic_sort_yellow.svg'
  },
  SEARCH: {
    BLUE: '/icons/ic_search_blue.svg',
    YELLOW: '/icons/ic_search_yellow.svg'
  }
}

export const POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right'
}

export const REGEX = {
  EMAIL: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  NAME: new RegExp(/^(?=.{2,50}$)([A-Za-zÀ-ÖØ-öø-ÿ]+[- ']?[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/),
  PASSWORD: new RegExp(/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^£$`'<>])[A-Za-z\d@$!%*#?&^£$`'<>]{8,}$/)
}

export const THEMES = {
  BLUE: 'blue'
}

export const THROWABLE_STATUS_CODES = [500, 404, 403, 400];