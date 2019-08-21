var app = new Vue({
    el: '#app',
    delimiters: [
        '{', '}'
    ],
    data: {
        projets: [],
        select: "All",
        page: 1,
        count: 0,
        nbrPage: 0,
        onLoad: false
    },
    mounted() {
        //this.sayHello();
        this.getArticle();
        this.getCount();
    },
    methods: {
        setSelect(selection) {
            this.page = 1;
            this.select = selection;
            this.getArticleSelection();
        },
        hover_select: function(categorie) {
            return {
                "Projet_hover_web": categorie == "web",
                "Projet_hover_audiovisuel": categorie == "audiovisuel",
                "Projet_hover_social": categorie == "social",
                "Projet_hover_materiel": categorie == "materiel"
            }
        },
        setPage(page) {
            if (this.page != page) {
                this.page = page;
                if (this.select == 'All') {
                    this.getArticle();
                } else {
                    this.getArticleSelection();
                }
            }
        },
        setLoad() {
            if (this.onLoad == false) {
                this.onLoad = true;
            } else {
                this.onLoad = false;
            }

        },
        getArticle() {
            this.onLoad = true;
            axios({
                method: 'POST',
                url: '/get-projet',
                data: {
                    page: this.page
                }
            }).then(response => {
                var json = JSON.parse(response.data);
                var object = this;
                this.projets = [];
                $.each(json, function(key, value) {
                    object.projets.push({ "id": value.id, "slug": value.slug, "miniature": value.miniature.path, "categorie": value.categorie });
                });
                this.onLoad = false;

            })
        },
        getArticleSelection() {
            axios({
                method: 'POST',
                url: '/get-projet-selection',
                data: {
                    //id :this.biens[0],
                    selection: this.select,
                    page: this.page
                }
            }).then(response => {
                var json = JSON.parse(response.data);
                var object = this;
                this.projets = [];
                $.each(json, function(key, value) {
                    object.projets.push({ "id": value.id, "slug": value.slug, "categorie": value.categorie, "miniature": value.miniature.path });
                });
                this.getCount();
            })
        },
        getCount() {
            axios({
                method: 'POST',
                url: '/count-projet',
                data: {
                    //id :this.biens[0],
                    selection: this.select
                }
            }).then(response => {
                var json = JSON.parse(response.data);
                this.count = json;
                this.nbrPage = Math.ceil(this.count / 6)
            })
        }
    }
})