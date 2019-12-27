window.onload = () => {
  console.log('loaded')
  getProjects();
}

function getProjects() {
  let ref = document.getElementsByClassName('tabHeader')[0]
  makeActive(ref);
  document.getElementById('tabContent').style.borderTopLeftRadius = "0px"
  clearContentItems()
  renderContentItems('projects')
}

function getPosts() {
  let ref = document.getElementsByClassName('tabHeader')[1]
  makeActive(ref);
  clearContentItems()
  renderContentItems('posts')
}

function makeActive(tabRef) {
  document.getElementById('tabContent').style.borderTopLeftRadius = "10px"
  let tabs = document.getElementsByClassName('tabHeader');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  tabRef.classList.add('active')
}

function renderContentItems(itemType) {
  fetch(`/api/${itemType}`)
    .then((r) => r.json())
    .then((resp) => {
      resp.posts.forEach((item) => {
        let htmlStr =
          `
      <button class="contentItem" onclick="window.location.pathname='/content/${itemType}/${item.slug}'">
          <h1>${item.title}</h1>
          <p>${item.custom_excerpt}</p>
          <hr>
      </button>
      `
        document.getElementById('tabContent').innerHTML += htmlStr
      })
    })
}

function clearContentItems() {
  let items = document.getElementsByClassName('contentItem')
  const count = items.length
  for (let i = 0; i < count; i++) {
    document.getElementById('tabContent').removeChild(items[0])
    console.log(items)
  }
}
