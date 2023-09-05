export default _ => {
  ;((c, n, s) => {
    if (c[n] === void 0) {
      c['ULObject'] = n
      c[n] =
        c[n] ||
        function() {
          ;(c[n].q = c[n].q || []).push(arguments)
        }
      c[n].l = 1 * new Date()
      var e = document.createElement('script')
      e.async = 1
      e.src = s + '/chatbot.js'
      var t = document.getElementsByTagName('script')[0]
      t.parentNode.insertBefore(e, t)
    }
  })(window, 'ul_widget', 'https://support-widget.userlocal.jp')
  ul_widget('init', { id: 'e2a23e52c7a9fd828e43', lg_id: '' })
}
