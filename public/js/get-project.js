var app = new Vue({
    el: "#app",
    delimiters: ["{", "}"],
    data: { projets: [], select: "All", page: 1, count: 0, nbrPage: 0, onLoad: !1 },
    mounted() { this.getArticle(), this.getCount() },
    methods: {
        setSelect(e) { this.page = 1, this.select = e, this.getArticleSelection() },
        hover_select: function(e) { return { Projet_hover_web: "web" == e, Projet_hover_audiovisuel: "audiovisuel" == e, Projet_hover_social: "social" == e, Projet_hover_materiel: "materiel" == e } },
        setPage(e) { this.page != e && (this.page = e, "All" == this.select ? this.getArticle() : this.getArticleSelection()) },
        setLoad() { this.onLoad = !(0 != this.onLoad) },
        getArticle() {
            this.onLoad = !0, axios({ method: "POST", url: "/get-projet", data: { page: this.page } }).then(e => {
                var t = JSON.parse(e.data),
                    i = this;
                this.projets = [], $.each(t, function(e, t) { i.projets.push({ id: t.id, slug: t.slug, miniature: t.path, categorie: t.categorie }) }), this.onLoad = !1
            })
        },
        slugify(e) { const t = new RegExp("àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;".split("").join("|"), "g"); return e.toString().toLowerCase().replace(/\s+/g, "-").replace(t, e => "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------".charAt("àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;".indexOf(e))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "") },
        getArticleSelection() {
            axios({ method: "POST", url: "/get-projet-selection", data: { selection: this.select, page: this.page } }).then(e => {
                var t = JSON.parse(e.data),
                    i = this;
                this.projets = [], $.each(t, function(e, t) { i.projets.push({ id: t.id, slug: t.slug, categorie: t.categorie, miniature: t.miniature.path }) }), this.getCount()
            })
        },
        getCount() {
            axios({ method: "POST", url: "/count-projet", data: { selection: this.select } }).then(e => {
                var t = JSON.parse(e.data);
                this.count = t, this.nbrPage = Math.ceil(this.count / 6)
            })
        }
    }
});