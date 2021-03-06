export const BANNER_TYPES = {
  ERROR: "error"
}

export const FIELD_TYPES = {
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email"
}

export const FILE_TYPES = {
  DOCUMENT: 'document',
  FOLDER: 'folder'
}

export const ICONS = {
  ACCOUNT_CIRCLE: {
    BLUE: '/icons/ic_account_circle_blue.svg',
    MAGENTA: '/icons/ic_account_circle_magenta.svg'
  },
  ADD: {
    DARK: '/icons/ic_add_dark.svg'
  },
  ARROW_RIGHT: {
    DARK: '/icons/ic_keyboard_arrow_right_dark.svg'
  },
  CLOSE: {
    DARK: '/icons/ic_close_dark.svg',
    WHITE: '/icons/ic_close_white.svg'
  },
  CLOUD_OFF: {
    DARK: '/icons/ic_cloud_off_dark.svg'
  },
  CLOUD_UPLOAD: {
    BLUE: '/icons/ic_cloud_upload_blue.svg'
  },
  FOLDER: {
    BLUE: '/icons/ic_folder_blue.svg',
    MAGENTA: '/icons/ic_folder_magenta.svg',
    WHITE: '/icons/ic_folder_white.svg'
  },
  IMAGE: {
    WHITE: '/icons/ic_image_white.svg'
  },
  KEY: {
    BLUE: '/icons/ic_key_blue.svg',
    MAGENTA: '/icons/ic_key_magenta.svg'
  },
  LOGOUT: {
    WHITE: '/icons/ic_logout_white.svg'
  },
  MAIL: {
    BLUE: '/icons/ic_mail_blue.svg',
    MAGENTA: '/icons/ic_mail_magenta.svg'
  },
  SORT: {
    YELLOW: '/icons/ic_sort_yellow.svg'
  },
  SEARCH: {
    BLUE: '/icons/ic_search_blue.svg',
    YELLOW: '/icons/ic_search_yellow.svg'
  },
  TEXT: {
    WHITE: '/icons/ic_format_align_left_white.svg'
  },
  THUMBS_UP: {
    DARK: '/icons/ic_thumb_up_dark.svg',
  },
}

export const LOCAL_STORAGE_KEYS = {
  TOKEN: "token"
}

export const POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right'
}

export const REGEX = {
  EMAIL: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  NAME: new RegExp(/^(?=.{2,50}$)([A-Za-zÀ-ÖØ-öø-ÿ]+[- ']?[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/),
  FOLDER_NAME: new RegExp(/^(?=.{1,50}$)([A-Za-zÀ-ÖØ-öø-ÿ0-9\-_ ]+)+$/),
  PASSWORD: new RegExp(/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^£$`'<>])[A-Za-z\d@$!%*#?&^£$`'<>]{8,}$/),
  CONTENT_TYPE_TEXT: new RegExp(/^text/),
  CONTENT_TYPE_IMAGE: new RegExp(/^image/),
  FILENAME_PARTS: new RegExp(/^(.+?)(\.[^.]*$|$)/) 
}

export const SORT_TYPES = {
  NAME: "name",
  CREATED_AT: "created at",
  UPDATED_AT: "updated at"
}

export const THEMES = {
  BLUE: 'blue',
  YELLOW: 'yellow',
  SECONDARY: 'secondary'
}

export const THROWABLE_STATUS_CODES = [500, 404, 403, 400];