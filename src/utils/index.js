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
