import {
  NAME,
  PREPARE,
  INIT,
  RESOLVE,
  REJECT,
  COMPLETE,
  CANCEL,
  CLEAR,
  CLEAR_ALL,
  DESTROY,
  DESTROY_ALL,
} from './constants'

export default [
  PREPARE,
  INIT,
  RESOLVE,
  REJECT,
  COMPLETE,
  CANCEL,
  CLEAR,
  CLEAR_ALL,
  DESTROY,
  DESTROY_ALL,
].reduce((acc, action) => {
  // eslint-disable-next-line no-param-reassign
  acc[action] = `@${NAME}/${action}`
  return acc
}, {})
