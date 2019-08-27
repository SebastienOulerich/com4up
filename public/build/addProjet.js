(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["addProjet"],{

/***/ "./assets/css/fixe.css":
/*!*****************************!*\
  !*** ./assets/css/fixe.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/css/lecture_projet.css":
/*!***************************************!*\
  !*** ./assets/css/lecture_projet.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/addProjet.js":
/*!********************************!*\
  !*** ./assets/js/addProjet.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you require will output into a single css file (app.css in this case)
__webpack_require__(/*! ../css/fixe.css */ "./assets/css/fixe.css");

__webpack_require__(/*! ../css/lecture_projet.css */ "./assets/css/lecture_projet.css");

__webpack_require__(/*! ./multiUpload.js */ "./assets/js/multiUpload.js"); // import upload from './multiUpload'
// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

/***/ }),

/***/ "./assets/js/multiUpload.js":
/*!**********************************!*\
  !*** ./assets/js/multiUpload.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");

// setup an "add a tag" link
var $addTagLink = $('<a href="#" class="add_tag_link">Ajouter une image</a>');
var $newLinkLi = $('<li></li>').append($addTagLink); // handle the removal, just for this example

$('.remove-tag').click(function (e) {
  e.preventDefault();
  $(this).parent().remove();
  return false;
});
jQuery(document).ready(function () {
  // Get the ul that holds the collection of tags
  var $collectionHolder = $('ul.tags'); // add the "add a tag" anchor and li to the tags ul

  $collectionHolder.append($newLinkLi); // count the current form inputs we have (e.g. 2), use that as the new
  // index when inserting a new item (e.g. 2)

  $collectionHolder.data('index', $collectionHolder.find(':input').length);
  $addTagLink.on('click', function (e) {
    // prevent the link from creating a "#" on the URL
    e.preventDefault(); // add a new tag form (see code block below)

    addTagForm($collectionHolder, $newLinkLi);
  });
});

function addTagForm($collectionHolder, $newLinkLi) {
  // Get the data-prototype explained earlier
  var prototype = $collectionHolder.data('prototype'); // get the new index

  var index = $collectionHolder.data('index'); // Replace '$$name$$' in the prototype's HTML to
  // instead be a number based on how many items we have

  var newForm = prototype.replace(/__name__/g, index); // increase the index with one for the next item

  $collectionHolder.data('index', index + 1); // Display the form in the page in an li, before the "Add a tag" link li

  var $newFormLi = $('<li></li>').append(newForm); // also add a remove button, just for this example

  $newFormLi.append('<a href="#" class="remove-tag">x</a>');
  $newLinkLi.before($newFormLi); // handle the removal, just for this example

  $('.remove-tag').click(function (e) {
    e.preventDefault();
    $(this).parent().remove();
    return false;
  });
}

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, create(null));
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $find = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").find;
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ })

},[["./assets/js/addProjet.js","runtime","vendors~addProjet~cms"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL2ZpeGUuY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9jc3MvbGVjdHVyZV9wcm9qZXQuY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hZGRQcm9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL211bHRpVXBsb2FkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5maW5kLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCIkYWRkVGFnTGluayIsIiQiLCIkbmV3TGlua0xpIiwiYXBwZW5kIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnQiLCJyZW1vdmUiLCJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwiJGNvbGxlY3Rpb25Ib2xkZXIiLCJkYXRhIiwiZmluZCIsImxlbmd0aCIsIm9uIiwiYWRkVGFnRm9ybSIsInByb3RvdHlwZSIsImluZGV4IiwibmV3Rm9ybSIsInJlcGxhY2UiLCIkbmV3Rm9ybUxpIiwiYmVmb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FBT0E7QUFDQUEsbUJBQU8sQ0FBQyw4Q0FBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLGtFQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsb0RBQUQsQ0FBUCxDLENBQ0E7QUFFQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RJO0FBQ0QsSUFBSUMsV0FBVyxHQUFHQyxDQUFDLENBQUMsd0RBQUQsQ0FBbkI7QUFDQSxJQUFJQyxVQUFVLEdBQUdELENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZUUsTUFBZixDQUFzQkgsV0FBdEIsQ0FBakIsQyxDQUNDOztBQUNHQyxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCRyxLQUFqQixDQUF1QixVQUFVQyxDQUFWLEVBQWE7QUFDaENBLEdBQUMsQ0FBQ0MsY0FBRjtBQUVBTCxHQUFDLENBQUMsSUFBRCxDQUFELENBQVFNLE1BQVIsR0FBaUJDLE1BQWpCO0FBRUEsU0FBTyxLQUFQO0FBQ0gsQ0FORDtBQU9KQyxNQUFNLENBQUNDLFFBQUQsQ0FBTixDQUFpQkMsS0FBakIsQ0FBdUIsWUFBWTtBQUFFO0FBQ2pDLE1BQUlDLGlCQUFpQixHQUFHWCxDQUFDLENBQUMsU0FBRCxDQUF6QixDQUQrQixDQUcvQjs7QUFDQVcsbUJBQWlCLENBQUNULE1BQWxCLENBQXlCRCxVQUF6QixFQUorQixDQU0vQjtBQUNBOztBQUNBVSxtQkFBaUIsQ0FBQ0MsSUFBbEIsQ0FBdUIsT0FBdkIsRUFBZ0NELGlCQUFpQixDQUFDRSxJQUFsQixDQUF1QixRQUF2QixFQUFpQ0MsTUFBakU7QUFFQWYsYUFBVyxDQUFDZ0IsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBVVgsQ0FBVixFQUFhO0FBQUU7QUFDbkNBLEtBQUMsQ0FBQ0MsY0FBRixHQURpQyxDQUdqQzs7QUFDQVcsY0FBVSxDQUFDTCxpQkFBRCxFQUFvQlYsVUFBcEIsQ0FBVjtBQUNILEdBTEQ7QUFRSCxDQWxCRDs7QUFvQkEsU0FBU2UsVUFBVCxDQUFvQkwsaUJBQXBCLEVBQXVDVixVQUF2QyxFQUFtRDtBQUFFO0FBQ2pELE1BQUlnQixTQUFTLEdBQUdOLGlCQUFpQixDQUFDQyxJQUFsQixDQUF1QixXQUF2QixDQUFoQixDQUQrQyxDQUcvQzs7QUFDQSxNQUFJTSxLQUFLLEdBQUdQLGlCQUFpQixDQUFDQyxJQUFsQixDQUF1QixPQUF2QixDQUFaLENBSitDLENBTS9DO0FBQ0E7O0FBQ0EsTUFBSU8sT0FBTyxHQUFHRixTQUFTLENBQUNHLE9BQVYsQ0FBa0IsV0FBbEIsRUFBK0JGLEtBQS9CLENBQWQsQ0FSK0MsQ0FVL0M7O0FBQ0FQLG1CQUFpQixDQUFDQyxJQUFsQixDQUF1QixPQUF2QixFQUFnQ00sS0FBSyxHQUFHLENBQXhDLEVBWCtDLENBYS9DOztBQUNBLE1BQUlHLFVBQVUsR0FBR3JCLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZUUsTUFBZixDQUFzQmlCLE9BQXRCLENBQWpCLENBZCtDLENBZ0IvQzs7QUFDQUUsWUFBVSxDQUFDbkIsTUFBWCxDQUFrQixzQ0FBbEI7QUFFQUQsWUFBVSxDQUFDcUIsTUFBWCxDQUFrQkQsVUFBbEIsRUFuQitDLENBcUIvQzs7QUFDQXJCLEdBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJHLEtBQWpCLENBQXVCLFVBQVVDLENBQVYsRUFBYTtBQUNoQ0EsS0FBQyxDQUFDQyxjQUFGO0FBRUFMLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU0sTUFBUixHQUFpQkMsTUFBakI7QUFFQSxXQUFPLEtBQVA7QUFDSCxHQU5EO0FBT0gsQzs7Ozs7Ozs7Ozs7QUM1REosc0JBQXNCLG1CQUFPLENBQUMsNkZBQWdDO0FBQzlELGFBQWEsbUJBQU8sQ0FBQyxxRkFBNEI7QUFDakQsV0FBVyxtQkFBTyxDQUFDLG1FQUFtQjs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEJhO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxZQUFZLG1CQUFPLENBQUMseUZBQThCO0FBQ2xELHVCQUF1QixtQkFBTyxDQUFDLCtGQUFpQzs7QUFFaEU7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxxQkFBcUIsRUFBRTs7QUFFbkU7QUFDQTtBQUNBLEdBQUcsb0RBQW9EO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSIsImZpbGUiOiJhZGRQcm9qZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgcmVxdWlyZSB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIGNzcyBmaWxlIChhcHAuY3NzIGluIHRoaXMgY2FzZSlcbnJlcXVpcmUoJy4uL2Nzcy9maXhlLmNzcycpO1xucmVxdWlyZSgnLi4vY3NzL2xlY3R1cmVfcHJvamV0LmNzcycpO1xucmVxdWlyZSgnLi9tdWx0aVVwbG9hZC5qcycpO1xuLy8gaW1wb3J0IHVwbG9hZCBmcm9tICcuL211bHRpVXBsb2FkJ1xuXG4vLyBOZWVkIGpRdWVyeT8gSW5zdGFsbCBpdCB3aXRoIFwieWFybiBhZGQganF1ZXJ5XCIsIHRoZW4gdW5jb21tZW50IHRvIHJlcXVpcmUgaXQuXG4vLyBjb25zdCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbiIsIiAgICAvLyBzZXR1cCBhbiBcImFkZCBhIHRhZ1wiIGxpbmtcbiAgIHZhciAkYWRkVGFnTGluayA9ICQoJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhZGRfdGFnX2xpbmtcIj5Bam91dGVyIHVuZSBpbWFnZTwvYT4nKTtcbiAgIHZhciAkbmV3TGlua0xpID0gJCgnPGxpPjwvbGk+JykuYXBwZW5kKCRhZGRUYWdMaW5rKTtcbiAgICAvLyBoYW5kbGUgdGhlIHJlbW92YWwsIGp1c3QgZm9yIHRoaXMgZXhhbXBsZVxuICAgICAgICQoJy5yZW1vdmUtdGFnJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgIH0pO1xuICAgalF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7IC8vIEdldCB0aGUgdWwgdGhhdCBob2xkcyB0aGUgY29sbGVjdGlvbiBvZiB0YWdzXG4gICAgICAgdmFyICRjb2xsZWN0aW9uSG9sZGVyID0gJCgndWwudGFncycpO1xuXG4gICAgICAgLy8gYWRkIHRoZSBcImFkZCBhIHRhZ1wiIGFuY2hvciBhbmQgbGkgdG8gdGhlIHRhZ3MgdWxcbiAgICAgICAkY29sbGVjdGlvbkhvbGRlci5hcHBlbmQoJG5ld0xpbmtMaSk7XG5cbiAgICAgICAvLyBjb3VudCB0aGUgY3VycmVudCBmb3JtIGlucHV0cyB3ZSBoYXZlIChlLmcuIDIpLCB1c2UgdGhhdCBhcyB0aGUgbmV3XG4gICAgICAgLy8gaW5kZXggd2hlbiBpbnNlcnRpbmcgYSBuZXcgaXRlbSAoZS5nLiAyKVxuICAgICAgICRjb2xsZWN0aW9uSG9sZGVyLmRhdGEoJ2luZGV4JywgJGNvbGxlY3Rpb25Ib2xkZXIuZmluZCgnOmlucHV0JykubGVuZ3RoKTtcblxuICAgICAgICRhZGRUYWdMaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7IC8vIHByZXZlbnQgdGhlIGxpbmsgZnJvbSBjcmVhdGluZyBhIFwiI1wiIG9uIHRoZSBVUkxcbiAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgIC8vIGFkZCBhIG5ldyB0YWcgZm9ybSAoc2VlIGNvZGUgYmxvY2sgYmVsb3cpXG4gICAgICAgICAgIGFkZFRhZ0Zvcm0oJGNvbGxlY3Rpb25Ib2xkZXIsICRuZXdMaW5rTGkpO1xuICAgICAgIH0pO1xuXG5cbiAgIH0pO1xuXG4gICBmdW5jdGlvbiBhZGRUYWdGb3JtKCRjb2xsZWN0aW9uSG9sZGVyLCAkbmV3TGlua0xpKSB7IC8vIEdldCB0aGUgZGF0YS1wcm90b3R5cGUgZXhwbGFpbmVkIGVhcmxpZXJcbiAgICAgICB2YXIgcHJvdG90eXBlID0gJGNvbGxlY3Rpb25Ib2xkZXIuZGF0YSgncHJvdG90eXBlJyk7XG5cbiAgICAgICAvLyBnZXQgdGhlIG5ldyBpbmRleFxuICAgICAgIHZhciBpbmRleCA9ICRjb2xsZWN0aW9uSG9sZGVyLmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAvLyBSZXBsYWNlICckJG5hbWUkJCcgaW4gdGhlIHByb3RvdHlwZSdzIEhUTUwgdG9cbiAgICAgICAvLyBpbnN0ZWFkIGJlIGEgbnVtYmVyIGJhc2VkIG9uIGhvdyBtYW55IGl0ZW1zIHdlIGhhdmVcbiAgICAgICB2YXIgbmV3Rm9ybSA9IHByb3RvdHlwZS5yZXBsYWNlKC9fX25hbWVfXy9nLCBpbmRleCk7XG5cbiAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2l0aCBvbmUgZm9yIHRoZSBuZXh0IGl0ZW1cbiAgICAgICAkY29sbGVjdGlvbkhvbGRlci5kYXRhKCdpbmRleCcsIGluZGV4ICsgMSk7XG5cbiAgICAgICAvLyBEaXNwbGF5IHRoZSBmb3JtIGluIHRoZSBwYWdlIGluIGFuIGxpLCBiZWZvcmUgdGhlIFwiQWRkIGEgdGFnXCIgbGluayBsaVxuICAgICAgIHZhciAkbmV3Rm9ybUxpID0gJCgnPGxpPjwvbGk+JykuYXBwZW5kKG5ld0Zvcm0pO1xuXG4gICAgICAgLy8gYWxzbyBhZGQgYSByZW1vdmUgYnV0dG9uLCBqdXN0IGZvciB0aGlzIGV4YW1wbGVcbiAgICAgICAkbmV3Rm9ybUxpLmFwcGVuZCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInJlbW92ZS10YWdcIj54PC9hPicpO1xuXG4gICAgICAgJG5ld0xpbmtMaS5iZWZvcmUoJG5ld0Zvcm1MaSk7XG5cbiAgICAgICAvLyBoYW5kbGUgdGhlIHJlbW92YWwsIGp1c3QgZm9yIHRoaXMgZXhhbXBsZVxuICAgICAgICQoJy5yZW1vdmUtdGFnJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgIH0pO1xuICAgfSIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZScpO1xuXG52YXIgVU5TQ09QQUJMRVMgPSB3ZWxsS25vd25TeW1ib2woJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmlmIChBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKSB7XG4gIGhpZGUoQXJyYXlQcm90b3R5cGUsIFVOU0NPUEFCTEVTLCBjcmVhdGUobnVsbCkpO1xufVxuXG4vLyBhZGQgYSBrZXkgdG8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbmQ7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxudmFyIEZJTkQgPSAnZmluZCc7XG52YXIgU0tJUFNfSE9MRVMgPSB0cnVlO1xuXG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYgKEZJTkQgaW4gW10pIEFycmF5KDEpW0ZJTkRdKGZ1bmN0aW9uICgpIHsgU0tJUFNfSE9MRVMgPSBmYWxzZTsgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogU0tJUFNfSE9MRVMgfSwge1xuICBmaW5kOiBmdW5jdGlvbiBmaW5kKGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKEZJTkQpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==