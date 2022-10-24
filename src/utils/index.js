export function toast(show, message) {
  let timer = null

  const _toast = function (msg) {
    show.value = true
    message.value = msg
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      show.value = false
      message.value = ''
    }, 1500)
  }

  return _toast
}

export function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  let context = ''
  if (r != null) context = r[2]
  reg = null
  r = null
  return context == null || context == '' || context == 'undefined'
    ? ''
    : context
}
