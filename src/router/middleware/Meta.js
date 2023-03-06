
export default {
  async metaMeddleware(to) {
    const {meta: { name }} = to

    const pageTitle = name
    const titleName = name ? `${pageTitle}` : "Wave"
    const [title] = document.getElementsByTagName('title')
    title.innerHTML = titleName

    


  }
}
