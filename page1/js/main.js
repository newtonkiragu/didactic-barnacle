Vue.component('folder-contents', {
  props: ['folder', 'childrenOf'],
  template: `
    <details>
      <summary>📁 {{folder.name}}</summary>
      <ul>
        <li v-for="item in childrenOf(folder)">
          <folder-contents
            v-if="item.folder"
            :folder="item"
            :childrenOf="childrenOf"
          ></folder-contents>
          <file-item :item="item" v-else>
          </file-item>
        </li>
      </ul>
    </details>
  `
})

Vue.component('file-item', {
  props: ['item'],
  template: `
    <span class="file">
      📄 {{item.name}}
    </span>
  `
})

new Vue({
  el: "#vue",
  data: {
    fileItems: [],
    nextFolderId: 0
  },
  computed: {
    homeFolder() {
      return this.fileItems[0]
    },
    homeFolders() {
      return this.fileItems.filter(
        item => item.folder && item.parent === null
      )
    }
  },
  methods: {
    createFolder(name, parent) {
      this.fileItems.push({
        id: this.nextFolderId++,
        folder: true,
        name,
        parent
      })
    },
    createFile(name, parent) {
      this.fileItems.push({
        folder: false,
        name,
        parent
      })
    },
    childrenOf(folder) {
      return this.fileItems.filter(item => item.parent === folder.name)
    }
  },
  created() {
    this.createFolder("...", null)

    this.createFolder("page1", "...")
    this.createFile("index.html (you are here)", "page1")
    this.createFolder("vendor", "js")
    this.createFile("modernizr-3.11.2.min", "vendor")
    this.createFile("plugins.js", "js")
    this.createFile("main.js", "js")

    this.createFile("300.jpeg", "img")
    this.createFile("styles.css", "css")
    this.createFile("main.css", "css")
    this.createFile("normalize.css", "css")



    this.createFolder("nest1", "page1")
    this.createFile("index.html", "nest1")

    this.createFolder("nest2", "page1")
    this.createFile("index.html", "nest2")

    this.createFolder("css", "page1")
    this.createFolder("images", "page1")
    this.createFile("2way_interractive.svg", "images")

    this.createFolder("js", "page1")

  }
})
