(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cms"],{

/***/ "./assets/css/projets_gestion.css":
/*!****************************************!*\
  !*** ./assets/css/projets_gestion.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/css/techno_gestion.css":
/*!***************************************!*\
  !*** ./assets/css/techno_gestion.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/cms.js":
/*!**************************!*\
  !*** ./assets/js/cms.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you require will output into a single css file (app.css in this case)
// require('vue');
var Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");

__webpack_require__(/*! axios */ "./node_modules/axios/index.js"); // import Vue from 'vue'


__webpack_require__(/*! ../css/techno_gestion.css */ "./assets/css/techno_gestion.css");

__webpack_require__(/*! ../css/projets_gestion.css */ "./assets/css/projets_gestion.css");

__webpack_require__(/*! ./get-project */ "./assets/js/get-project.js");

__webpack_require__(/*! ./flip */ "./assets/js/flip.js");

/***/ }),

/***/ "./assets/js/flip.js":
/*!***************************!*\
  !*** ./assets/js/flip.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");

__webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cards = Array.from(document.querySelectorAll(".card"));
cards.forEach(function (t) {
  t.addEventListener("click", function () {
    var e = new Flip();
    e.read(cards), t.parentNode.removeChild(t), cards = cards.filter(function (e) {
      return e !== t;
    }), e.play(cards);
  });
});

var Flip =
/*#__PURE__*/
function () {
  "use strict";

  function Flip() {
    _classCallCheck(this, Flip);

    this.duration = 300, this.positions = {};
  }

  _createClass(Flip, [{
    key: "read",
    value: function read(t) {
      var _this = this;

      t.forEach(function (t) {
        var e = t.getAttribute("id");
        _this.positions[e] = t.getBoundingClientRect();
      });
    }
  }, {
    key: "play",
    value: function play(t) {
      var _this2 = this;

      t.forEach(function (t) {
        var e = t.getAttribute("id"),
            i = t.getBoundingClientRect(),
            r = _this2.positions[e],
            a = r.x - i.x,
            s = r.y - i.y,
            n = r.width / i.width,
            o = r.height / i.height;
        t.animate([{
          transform: "translate(".concat(a, "px, ").concat(s, "px) scale(").concat(n, ", ").concat(o, ")")
        }, {
          transform: "none"
        }], {
          duration: _this2.duration,
          easing: "ease-in-out",
          fill: "both"
        }), t.style.transform = "translate(".concat(a, "px, ").concat(s, "px) scale(").concat(n, ", ").concat(o, ")");
      });
    }
  }]);

  return Flip;
}();

/***/ }),

/***/ "./assets/js/get-project.js":
/*!**********************************!*\
  !*** ./assets/js/get-project.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.constructor */ "./node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.string.split */ "./node_modules/core-js/modules/es.string.split.js");

var app = new Vue({
  el: "#app",
  delimiters: ["{", "}"],
  data: {
    projets: [],
    select: "All",
    page: 1,
    count: 0,
    nbrPage: 0,
    onLoad: !1
  },
  mounted: function mounted() {
    this.getArticle(), this.getCount();
  },
  methods: {
    setSelect: function setSelect(e) {
      this.page = 1, this.select = e, this.getArticleSelection();
    },
    hover_select: function hover_select(e) {
      return {
        Projet_hover_web: "web" == e,
        Projet_hover_audiovisuel: "audiovisuel" == e,
        Projet_hover_social: "social" == e,
        Projet_hover_materiel: "materiel" == e
      };
    },
    setPage: function setPage(e) {
      this.page != e && (this.page = e, "All" == this.select ? this.getArticle() : this.getArticleSelection());
    },
    setLoad: function setLoad() {
      this.onLoad = !(0 != this.onLoad);
    },
    getArticle: function getArticle() {
      var _this = this;

      this.onLoad = !0, axios({
        method: "POST",
        url: "/get-projet",
        data: {
          page: this.page
        }
      }).then(function (e) {
        var t = JSON.parse(e.data),
            i = _this;
        _this.projets = [], $.each(t, function (e, t) {
          i.projets.push({
            id: t.id,
            slug: i.slugify(t.title),
            miniature: t.path,
            categorie: t.categorie
          });
        }), _this.onLoad = !1;
      });
    },
    slugify: function slugify(e) {
      var t = new RegExp("àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;".split("").join("|"), "g");
      return e.toString().toLowerCase().replace(/\s+/g, "-").replace(t, function (e) {
        return "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------".charAt("àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;".indexOf(e));
      }).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    },
    getArticleSelection: function getArticleSelection() {
      var _this2 = this;

      axios({
        method: "POST",
        url: "/get-projet-selection",
        data: {
          selection: this.select,
          page: this.page
        }
      }).then(function (e) {
        var t = JSON.parse(e.data),
            i = _this2;
        _this2.projets = [], $.each(t, function (e, t) {
          i.projets.push({
            id: t.id,
            slug: t.slug,
            categorie: t.categorie,
            miniature: t.miniature.path
          });
        }), _this2.getCount();
      });
    },
    getCount: function getCount() {
      var _this3 = this;

      axios({
        method: "POST",
        url: "/count-projet",
        data: {
          selection: this.select
        }
      }).then(function (e) {
        var t = JSON.parse(e.data);
        _this3.count = t, _this3.nbrPage = Math.ceil(_this3.count / 6);
      });
    }
  }
});

/***/ })

},[["./assets/js/cms.js","runtime","vendors~addProjet~cms","vendors~cms"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL3Byb2pldHNfZ2VzdGlvbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Nzcy90ZWNobm9fZ2VzdGlvbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2Ntcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZmxpcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZ2V0LXByb2plY3QuanMiXSwibmFtZXMiOlsiVnVlIiwicmVxdWlyZSIsImNhcmRzIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIkZsaXAiLCJyZWFkIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZmlsdGVyIiwicGxheSIsImR1cmF0aW9uIiwicG9zaXRpb25zIiwiZ2V0QXR0cmlidXRlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaSIsInIiLCJhIiwieCIsInMiLCJ5IiwibiIsIndpZHRoIiwibyIsImhlaWdodCIsImFuaW1hdGUiLCJ0cmFuc2Zvcm0iLCJlYXNpbmciLCJmaWxsIiwic3R5bGUiLCJhcHAiLCJlbCIsImRlbGltaXRlcnMiLCJkYXRhIiwicHJvamV0cyIsInNlbGVjdCIsInBhZ2UiLCJjb3VudCIsIm5iclBhZ2UiLCJvbkxvYWQiLCJtb3VudGVkIiwiZ2V0QXJ0aWNsZSIsImdldENvdW50IiwibWV0aG9kcyIsInNldFNlbGVjdCIsImdldEFydGljbGVTZWxlY3Rpb24iLCJob3Zlcl9zZWxlY3QiLCJQcm9qZXRfaG92ZXJfd2ViIiwiUHJvamV0X2hvdmVyX2F1ZGlvdmlzdWVsIiwiUHJvamV0X2hvdmVyX3NvY2lhbCIsIlByb2pldF9ob3Zlcl9tYXRlcmllbCIsInNldFBhZ2UiLCJzZXRMb2FkIiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJ0aGVuIiwiSlNPTiIsInBhcnNlIiwiJCIsImVhY2giLCJwdXNoIiwiaWQiLCJzbHVnIiwic2x1Z2lmeSIsInRpdGxlIiwibWluaWF0dXJlIiwicGF0aCIsImNhdGVnb3JpZSIsIlJlZ0V4cCIsInNwbGl0Iiwiam9pbiIsInRvU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiY2hhckF0IiwiaW5kZXhPZiIsInNlbGVjdGlvbiIsIk1hdGgiLCJjZWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FBT0E7QUFDQTtBQUNBLElBQUlBLEdBQUcsR0FBR0MsbUJBQU8sQ0FBQyx1REFBRCxDQUFqQjs7QUFFQUEsbUJBQU8sQ0FBQyw0Q0FBRCxDQUFQLEMsQ0FFQTs7O0FBRUFBLG1CQUFPLENBQUMsa0VBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQyxvRUFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGlEQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsbUNBQUQsQ0FBUCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBLElBQUlDLEtBQUssR0FBQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBWCxDQUFWO0FBQXlESixLQUFLLENBQUNLLE9BQU4sQ0FBYyxVQUFBQyxDQUFDLEVBQUU7QUFBQ0EsR0FBQyxDQUFDQyxnQkFBRixDQUFtQixPQUFuQixFQUEyQixZQUFVO0FBQUMsUUFBSUMsQ0FBQyxHQUFDLElBQUlDLElBQUosRUFBTjtBQUFlRCxLQUFDLENBQUNFLElBQUYsQ0FBT1YsS0FBUCxHQUFjTSxDQUFDLENBQUNLLFVBQUYsQ0FBYUMsV0FBYixDQUF5Qk4sQ0FBekIsQ0FBZCxFQUEwQ04sS0FBSyxHQUFDQSxLQUFLLENBQUNhLE1BQU4sQ0FBYSxVQUFBTCxDQUFDO0FBQUEsYUFBRUEsQ0FBQyxLQUFHRixDQUFOO0FBQUEsS0FBZCxDQUFoRCxFQUF1RUUsQ0FBQyxDQUFDTSxJQUFGLENBQU9kLEtBQVAsQ0FB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bXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgcmVxdWlyZSB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIGNzcyBmaWxlIChhcHAuY3NzIGluIHRoaXMgY2FzZSlcbi8vIHJlcXVpcmUoJ3Z1ZScpO1xudmFyIFZ1ZSA9IHJlcXVpcmUoJ3Z1ZScpXG5cbnJlcXVpcmUoJ2F4aW9zJyk7XG5cbi8vIGltcG9ydCBWdWUgZnJvbSAndnVlJ1xuXG5yZXF1aXJlKCcuLi9jc3MvdGVjaG5vX2dlc3Rpb24uY3NzJyk7XG5yZXF1aXJlKCcuLi9jc3MvcHJvamV0c19nZXN0aW9uLmNzcycpO1xucmVxdWlyZSgnLi9nZXQtcHJvamVjdCcpO1xucmVxdWlyZSgnLi9mbGlwJyk7XG5cblxuIiwibGV0IGNhcmRzPUFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkXCIpKTtjYXJkcy5mb3JFYWNoKHQ9Pnt0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7bGV0IGU9bmV3IEZsaXA7ZS5yZWFkKGNhcmRzKSx0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodCksY2FyZHM9Y2FyZHMuZmlsdGVyKGU9PmUhPT10KSxlLnBsYXkoY2FyZHMpfSl9KTtjbGFzcyBGbGlwe2NvbnN0cnVjdG9yKCl7dGhpcy5kdXJhdGlvbj0zMDAsdGhpcy5wb3NpdGlvbnM9e319cmVhZCh0KXt0LmZvckVhY2godD0+e2NvbnN0IGU9dC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTt0aGlzLnBvc2l0aW9uc1tlXT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpfSl9cGxheSh0KXt0LmZvckVhY2godD0+e2NvbnN0IGU9dC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSxpPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkscj10aGlzLnBvc2l0aW9uc1tlXSxhPXIueC1pLngscz1yLnktaS55LG49ci53aWR0aC9pLndpZHRoLG89ci5oZWlnaHQvaS5oZWlnaHQ7dC5hbmltYXRlKFt7dHJhbnNmb3JtOmB0cmFuc2xhdGUoJHthfXB4LCAke3N9cHgpIHNjYWxlKCR7bn0sICR7b30pYH0se3RyYW5zZm9ybTpcIm5vbmVcIn1dLHtkdXJhdGlvbjp0aGlzLmR1cmF0aW9uLGVhc2luZzpcImVhc2UtaW4tb3V0XCIsZmlsbDpcImJvdGhcIn0pLHQuc3R5bGUudHJhbnNmb3JtPWB0cmFuc2xhdGUoJHthfXB4LCAke3N9cHgpIHNjYWxlKCR7bn0sICR7b30pYH0pfX0iLCJ2YXIgYXBwID0gbmV3IFZ1ZSh7ZWw6XCIjYXBwXCIsZGVsaW1pdGVyczpbXCJ7XCIsXCJ9XCJdLGRhdGE6e3Byb2pldHM6W10sc2VsZWN0OlwiQWxsXCIscGFnZToxLGNvdW50OjAsbmJyUGFnZTowLG9uTG9hZDohMX0sbW91bnRlZCgpe3RoaXMuZ2V0QXJ0aWNsZSgpLHRoaXMuZ2V0Q291bnQoKX0sbWV0aG9kczp7c2V0U2VsZWN0KGUpe3RoaXMucGFnZT0xLHRoaXMuc2VsZWN0PWUsdGhpcy5nZXRBcnRpY2xlU2VsZWN0aW9uKCl9LGhvdmVyX3NlbGVjdDpmdW5jdGlvbihlKXtyZXR1cm57UHJvamV0X2hvdmVyX3dlYjpcIndlYlwiPT1lLFByb2pldF9ob3Zlcl9hdWRpb3Zpc3VlbDpcImF1ZGlvdmlzdWVsXCI9PWUsUHJvamV0X2hvdmVyX3NvY2lhbDpcInNvY2lhbFwiPT1lLFByb2pldF9ob3Zlcl9tYXRlcmllbDpcIm1hdGVyaWVsXCI9PWV9fSxzZXRQYWdlKGUpe3RoaXMucGFnZSE9ZSYmKHRoaXMucGFnZT1lLFwiQWxsXCI9PXRoaXMuc2VsZWN0P3RoaXMuZ2V0QXJ0aWNsZSgpOnRoaXMuZ2V0QXJ0aWNsZVNlbGVjdGlvbigpKX0sc2V0TG9hZCgpe3RoaXMub25Mb2FkPSEoMCE9dGhpcy5vbkxvYWQpfSxnZXRBcnRpY2xlKCl7dGhpcy5vbkxvYWQ9ITAsYXhpb3Moe21ldGhvZDpcIlBPU1RcIix1cmw6XCIvZ2V0LXByb2pldFwiLGRhdGE6e3BhZ2U6dGhpcy5wYWdlfX0pLnRoZW4oZT0+e3ZhciB0PUpTT04ucGFyc2UoZS5kYXRhKSxpPXRoaXM7dGhpcy5wcm9qZXRzPVtdLCQuZWFjaCh0LGZ1bmN0aW9uKGUsdCl7aS5wcm9qZXRzLnB1c2goe2lkOnQuaWQsc2x1ZzppLnNsdWdpZnkodC50aXRsZSksbWluaWF0dXJlOnQucGF0aCxjYXRlZ29yaWU6dC5jYXRlZ29yaWV9KX0pLHRoaXMub25Mb2FkPSExfSl9LHNsdWdpZnkoZSl7Y29uc3QgdD1uZXcgUmVnRXhwKFwiw6DDocOkw6LDo8OlxIPDpsSFw6fEh8SNxJHEj8Oow6nEm8SXw6vDqsSZxJ/HteG4p8Osw63Dr8OuxK/FguG4v8e5xYTFiMOxw7LDs8O2w7TFk8O44bmVxZXFmcOfxZ/Fm8WhyJnFpcibw7nDusO8w7vHmMWvxbHFq8Wz4bqD4bqNw7/DvcW6xb7FvMK3L18sOjtcIi5zcGxpdChcIlwiKS5qb2luKFwifFwiKSxcImdcIik7cmV0dXJuIGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZyxcIi1cIikucmVwbGFjZSh0LGU9PlwiYWFhYWFhYWFhY2NjZGRlZWVlZWVlZ2doaWlpaWlsbW5ubm5vb29vb29wcnJzc3Nzc3R0dXV1dXV1dXV1d3h5eXp6ei0tLS0tLVwiLmNoYXJBdChcIsOgw6HDpMOiw6PDpcSDw6bEhcOnxIfEjcSRxI/DqMOpxJvEl8Orw6rEmcSfx7XhuKfDrMOtw6/DrsSvxYLhuL/HucWExYjDscOyw7PDtsO0xZPDuOG5lcWVxZnDn8WfxZvFociZxaXIm8O5w7rDvMO7x5jFr8WxxavFs+G6g+G6jcO/w73FusW+xbzCty9fLDo7XCIuaW5kZXhPZihlKSkpLnJlcGxhY2UoLyYvZyxcIi1hbmQtXCIpLnJlcGxhY2UoL1teXFx3XFwtXSsvZyxcIlwiKS5yZXBsYWNlKC9cXC1cXC0rL2csXCItXCIpLnJlcGxhY2UoL14tKy8sXCJcIikucmVwbGFjZSgvLSskLyxcIlwiKX0sZ2V0QXJ0aWNsZVNlbGVjdGlvbigpe2F4aW9zKHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL2dldC1wcm9qZXQtc2VsZWN0aW9uXCIsZGF0YTp7c2VsZWN0aW9uOnRoaXMuc2VsZWN0LHBhZ2U6dGhpcy5wYWdlfX0pLnRoZW4oZT0+e3ZhciB0PUpTT04ucGFyc2UoZS5kYXRhKSxpPXRoaXM7dGhpcy5wcm9qZXRzPVtdLCQuZWFjaCh0LGZ1bmN0aW9uKGUsdCl7aS5wcm9qZXRzLnB1c2goe2lkOnQuaWQsc2x1Zzp0LnNsdWcsY2F0ZWdvcmllOnQuY2F0ZWdvcmllLG1pbmlhdHVyZTp0Lm1pbmlhdHVyZS5wYXRofSl9KSx0aGlzLmdldENvdW50KCl9KX0sZ2V0Q291bnQoKXtheGlvcyh7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi9jb3VudC1wcm9qZXRcIixkYXRhOntzZWxlY3Rpb246dGhpcy5zZWxlY3R9fSkudGhlbihlPT57dmFyIHQ9SlNPTi5wYXJzZShlLmRhdGEpO3RoaXMuY291bnQ9dCx0aGlzLm5iclBhZ2U9TWF0aC5jZWlsKHRoaXMuY291bnQvNil9KX19fSk7Il0sInNvdXJjZVJvb3QiOiIifQ==