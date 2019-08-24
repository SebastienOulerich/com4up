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
                    object.projets.push({ "id": value.id, "slug": object.slugify(value.title), "miniature": value.path, "categorie": value.categorie });
                });
                this.onLoad = false;

            })
        },
        slugify(string) {
            const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
            const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
            const p = new RegExp(a.split('').join('|'), 'g')

            return string.toString().toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
                .replace(/&/g, '-and-') // Replace & with 'and'
                .replace(/[^\w\-]+/g, '') // Remove all non-word characters
                .replace(/\-\-+/g, '-') // Replace multiple - with single -
                .replace(/^-+/, '') // Trim - from start of text
                .replace(/-+$/, '') // Trim - from end of text
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