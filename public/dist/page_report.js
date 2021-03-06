/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 547);
/******/ })
/************************************************************************/
/******/ ({

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(536);

__webpack_require__(529);

var report = {};

report.initSearchForm = function (start, end, container) {
	report.initSelect2();

	report.data = {
		start: start,
		end: end,
		container: container
	};

	report.initDaterangepicker();
};

report.cb = function (start, end) {
	$('#reportrange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
	$('input[name="start"]').val(start.format('MMM D, YYYY'));
	$('input[name="end"]').val(end.format('MMM D, YYYY'));
};

report.initSelect2 = function () {
	$('#reports-filter select').select2();
};

report.initDaterangepicker = function () {
	$(report.data.container).daterangepicker({
		startDate: start,
		endDate: end,
		applyClass: 'btn-primary',
		cancelClass: 'btn',
		weekStart: 1,
		locale: {
			"firstDay": 1
		},
		ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'This week': [moment().startOf('isoweek'), moment().endOf('isoweek')],
			'Last week': [moment().subtract(1, 'week').startOf('isoweek'), moment().subtract(1, 'week').endOf('isoweek')],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		}
	}, report.cb);

	report.cb(report.data.start, report.data.end);

	$('input[name="start"]').val(report.data.start);
	$('input[name="end"]').val(report.data.end);
};

report.initChart = function (data, container) {
	report.chart = {
		container: container,
		data: data
	};

	google.charts.load('current', { packages: ['corechart'] });
	google.charts.setOnLoadCallback(report.drawReportChart);
};

report.drawReportChart = function () {
	var data = google.visualization.arrayToDataTable(report.chart.data);

	var g1 = google.visualization.data.group(data, [0], [{
		type: 'number',
		label: 'Total Hours',
		column: 1,
		aggregation: google.visualization.data.sum
	}]);

	var view = new google.visualization.DataView(g1);
	view.setColumns([0, 1, { calc: function calc(data, row) {
			var num = data.getValue(row, 1);
			return core.formatGMH(num);
		},
		sourceColumn: 1,
		type: "string",
		role: "annotation" }]);

	var options = {
		hAxis: {
			title: 'Date'
		},
		vAxis: {
			title: 'Total Hours'
		},
		bar: { groupWidth: "95%" }
	};

	var chart = new google.visualization.ColumnChart(document.getElementById(report.chart.container));
	chart.draw(view, options);
};

window.report = report;

/***/ }),

/***/ 47:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(47)();
// imports


// module
exports.push([module.i, ".daterangepicker {\n  position: absolute;\n  color: inherit;\n  background-color: #fff;\n  border-radius: 4px;\n  width: 278px;\n  padding: 4px;\n  margin-top: 1px;\n  top: 100px;\n  left: 20px;\n  /* Calendars */ }\n  .daterangepicker:before, .daterangepicker:after {\n    position: absolute;\n    display: inline-block;\n    border-bottom-color: rgba(0, 0, 0, 0.2);\n    content: ''; }\n  .daterangepicker:before {\n    top: -7px;\n    border-right: 7px solid transparent;\n    border-left: 7px solid transparent;\n    border-bottom: 7px solid #ccc; }\n  .daterangepicker:after {\n    top: -6px;\n    border-right: 6px solid transparent;\n    border-bottom: 6px solid #fff;\n    border-left: 6px solid transparent; }\n  .daterangepicker.opensleft:before {\n    right: 9px; }\n  .daterangepicker.opensleft:after {\n    right: 10px; }\n  .daterangepicker.openscenter:before {\n    left: 0;\n    right: 0;\n    width: 0;\n    margin-left: auto;\n    margin-right: auto; }\n  .daterangepicker.openscenter:after {\n    left: 0;\n    right: 0;\n    width: 0;\n    margin-left: auto;\n    margin-right: auto; }\n  .daterangepicker.opensright:before {\n    left: 9px; }\n  .daterangepicker.opensright:after {\n    left: 10px; }\n  .daterangepicker.dropup {\n    margin-top: -5px; }\n    .daterangepicker.dropup:before {\n      top: initial;\n      bottom: -7px;\n      border-bottom: initial;\n      border-top: 7px solid #ccc; }\n    .daterangepicker.dropup:after {\n      top: initial;\n      bottom: -6px;\n      border-bottom: initial;\n      border-top: 6px solid #fff; }\n  .daterangepicker.dropdown-menu {\n    max-width: none;\n    z-index: 3001; }\n  .daterangepicker.single .ranges, .daterangepicker.single .calendar {\n    float: none; }\n  .daterangepicker.show-calendar .calendar {\n    display: block; }\n  .daterangepicker .calendar {\n    display: none;\n    max-width: 270px;\n    margin: 4px; }\n    .daterangepicker .calendar.single .calendar-table {\n      border: none; }\n    .daterangepicker .calendar th, .daterangepicker .calendar td {\n      white-space: nowrap;\n      text-align: center;\n      min-width: 32px; }\n  .daterangepicker .calendar-table {\n    border: 1px solid #fff;\n    padding: 4px;\n    border-radius: 4px;\n    background-color: #fff; }\n  .daterangepicker table {\n    width: 100%;\n    margin: 0; }\n  .daterangepicker td, .daterangepicker th {\n    text-align: center;\n    width: 20px;\n    height: 20px;\n    border-radius: 4px;\n    border: 1px solid transparent;\n    white-space: nowrap;\n    cursor: pointer; }\n    .daterangepicker td.available:hover, .daterangepicker th.available:hover {\n      background-color: #eee;\n      border-color: transparent;\n      color: inherit; }\n    .daterangepicker td.week, .daterangepicker th.week {\n      font-size: 80%;\n      color: #ccc; }\n  .daterangepicker td.off, .daterangepicker td.off.in-range, .daterangepicker td.off.start-date, .daterangepicker td.off.end-date {\n    background-color: #fff;\n    border-color: transparent;\n    color: #999; }\n  .daterangepicker td.in-range {\n    background-color: #ebf4f8;\n    border-color: transparent;\n    color: #000;\n    border-radius: 0; }\n  .daterangepicker td.start-date {\n    border-radius: 4px 0 0 4px; }\n  .daterangepicker td.end-date {\n    border-radius: 0 4px 4px 0; }\n  .daterangepicker td.start-date.end-date {\n    border-radius: 4px; }\n  .daterangepicker td.active, .daterangepicker td.active:hover {\n    background-color: #357ebd;\n    border-color: transparent;\n    color: #fff; }\n  .daterangepicker th.month {\n    width: auto; }\n  .daterangepicker td.disabled, .daterangepicker option.disabled {\n    color: #999;\n    cursor: not-allowed;\n    text-decoration: line-through; }\n  .daterangepicker select.monthselect, .daterangepicker select.yearselect {\n    font-size: 12px;\n    padding: 1px;\n    height: auto;\n    margin: 0;\n    cursor: default; }\n  .daterangepicker select.monthselect {\n    margin-right: 2%;\n    width: 56%; }\n  .daterangepicker select.yearselect {\n    width: 40%; }\n  .daterangepicker select.hourselect, .daterangepicker select.minuteselect, .daterangepicker select.secondselect, .daterangepicker select.ampmselect {\n    width: 50px;\n    margin-bottom: 0; }\n  .daterangepicker .input-mini {\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    color: #555;\n    height: 30px;\n    line-height: 30px;\n    display: block;\n    vertical-align: middle;\n    margin: 0 0 5px 0;\n    padding: 0 6px 0 28px;\n    width: 100%; }\n    .daterangepicker .input-mini.active {\n      border: 1px solid #08c;\n      border-radius: 4px; }\n  .daterangepicker .daterangepicker_input {\n    position: relative; }\n    .daterangepicker .daterangepicker_input i {\n      position: absolute;\n      left: 8px;\n      top: 8px; }\n  .daterangepicker.rtl .input-mini {\n    padding-right: 28px;\n    padding-left: 6px; }\n  .daterangepicker.rtl .daterangepicker_input i {\n    left: auto;\n    right: 8px; }\n  .daterangepicker .calendar-time {\n    text-align: center;\n    margin: 5px auto;\n    line-height: 30px;\n    position: relative;\n    padding-left: 28px; }\n    .daterangepicker .calendar-time select.disabled {\n      color: #ccc;\n      cursor: not-allowed; }\n\n.ranges {\n  font-size: 11px;\n  float: none;\n  margin: 4px;\n  text-align: left; }\n  .ranges ul {\n    list-style: none;\n    margin: 0 auto;\n    padding: 0;\n    width: 100%; }\n  .ranges li {\n    font-size: 13px;\n    background-color: #f5f5f5;\n    border: 1px solid #f5f5f5;\n    border-radius: 4px;\n    color: #08c;\n    padding: 3px 12px;\n    margin-bottom: 8px;\n    cursor: pointer; }\n    .ranges li:hover {\n      background-color: #08c;\n      border: 1px solid #08c;\n      color: #fff; }\n    .ranges li.active {\n      background-color: #08c;\n      border: 1px solid #08c;\n      color: #fff; }\n\n/*  Larger Screen Styling */\n@media (min-width: 564px) {\n  .daterangepicker {\n    width: auto; }\n    .daterangepicker .ranges ul {\n      width: 160px; }\n    .daterangepicker.single .ranges ul {\n      width: 100%; }\n    .daterangepicker.single .calendar.left {\n      clear: none; }\n    .daterangepicker.single.ltr .ranges, .daterangepicker.single.ltr .calendar {\n      float: left; }\n    .daterangepicker.single.rtl .ranges, .daterangepicker.single.rtl .calendar {\n      float: right; }\n    .daterangepicker.ltr {\n      direction: ltr;\n      text-align: left; }\n      .daterangepicker.ltr .calendar.left {\n        clear: left;\n        margin-right: 0; }\n        .daterangepicker.ltr .calendar.left .calendar-table {\n          border-right: none;\n          border-top-right-radius: 0;\n          border-bottom-right-radius: 0; }\n      .daterangepicker.ltr .calendar.right {\n        margin-left: 0; }\n        .daterangepicker.ltr .calendar.right .calendar-table {\n          border-left: none;\n          border-top-left-radius: 0;\n          border-bottom-left-radius: 0; }\n      .daterangepicker.ltr .left .daterangepicker_input {\n        padding-right: 12px; }\n      .daterangepicker.ltr .calendar.left .calendar-table {\n        padding-right: 12px; }\n      .daterangepicker.ltr .ranges, .daterangepicker.ltr .calendar {\n        float: left; }\n    .daterangepicker.rtl {\n      direction: rtl;\n      text-align: right; }\n      .daterangepicker.rtl .calendar.left {\n        clear: right;\n        margin-left: 0; }\n        .daterangepicker.rtl .calendar.left .calendar-table {\n          border-left: none;\n          border-top-left-radius: 0;\n          border-bottom-left-radius: 0; }\n      .daterangepicker.rtl .calendar.right {\n        margin-right: 0; }\n        .daterangepicker.rtl .calendar.right .calendar-table {\n          border-right: none;\n          border-top-right-radius: 0;\n          border-bottom-right-radius: 0; }\n      .daterangepicker.rtl .left .daterangepicker_input {\n        padding-left: 12px; }\n      .daterangepicker.rtl .calendar.left .calendar-table {\n        padding-left: 12px; }\n      .daterangepicker.rtl .ranges, .daterangepicker.rtl .calendar {\n        text-align: right;\n        float: right; } }\n@media (min-width: 730px) {\n  .daterangepicker .ranges {\n    width: auto; }\n  .daterangepicker.ltr .ranges {\n    float: left; }\n  .daterangepicker.rtl .ranges {\n    float: right; }\n  .daterangepicker .calendar.left {\n    clear: none !important; } }\n", ""]);

// exports


/***/ }),

/***/ 50:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 525:
/***/ (function(module, exports) {

module.exports = "/**\n* @version: 2.1.25\n* @author: Dan Grossman http://www.dangrossman.info/\n* @copyright: Copyright (c) 2012-2017 Dan Grossman. All rights reserved.\n* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php\n* @website: https://www.daterangepicker.com/\n*/\n// Follow the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Make globaly available as well\n        define(['moment', 'jquery'], function (moment, jquery) {\n            return (root.daterangepicker = factory(moment, jquery));\n        });\n    } else if (typeof module === 'object' && module.exports) {\n        // Node / Browserify\n        //isomorphic issue\n        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;\n        if (!jQuery) {\n            jQuery = require('jquery');\n            if (!jQuery.fn) jQuery.fn = {};\n        }\n        module.exports = factory(require('moment'), jQuery);\n    } else {\n        // Browser globals\n        root.daterangepicker = factory(root.moment, root.jQuery);\n    }\n}(this, function(moment, $) {\n    var DateRangePicker = function(element, options, cb) {\n\n        //default settings for options\n        this.parentEl = 'body';\n        this.element = $(element);\n        this.startDate = moment().startOf('day');\n        this.endDate = moment().endOf('day');\n        this.minDate = false;\n        this.maxDate = false;\n        this.dateLimit = false;\n        this.autoApply = false;\n        this.singleDatePicker = false;\n        this.showDropdowns = false;\n        this.showWeekNumbers = false;\n        this.showISOWeekNumbers = false;\n        this.showCustomRangeLabel = true;\n        this.timePicker = false;\n        this.timePicker24Hour = false;\n        this.timePickerIncrement = 1;\n        this.timePickerSeconds = false;\n        this.linkedCalendars = true;\n        this.autoUpdateInput = true;\n        this.alwaysShowCalendars = false;\n        this.ranges = {};\n\n        this.opens = 'right';\n        if (this.element.hasClass('pull-right'))\n            this.opens = 'left';\n\n        this.drops = 'down';\n        if (this.element.hasClass('dropup'))\n            this.drops = 'up';\n\n        this.buttonClasses = 'btn btn-sm';\n        this.applyClass = 'btn-success';\n        this.cancelClass = 'btn-default';\n\n        this.locale = {\n            direction: 'ltr',\n            format: moment.localeData().longDateFormat('L'),\n            separator: ' - ',\n            applyLabel: 'Apply',\n            cancelLabel: 'Cancel',\n            weekLabel: 'W',\n            customRangeLabel: 'Custom Range',\n            daysOfWeek: moment.weekdaysMin(),\n            monthNames: moment.monthsShort(),\n            firstDay: moment.localeData().firstDayOfWeek()\n        };\n\n        this.callback = function() { };\n\n        //some state information\n        this.isShowing = false;\n        this.leftCalendar = {};\n        this.rightCalendar = {};\n\n        //custom options from user\n        if (typeof options !== 'object' || options === null)\n            options = {};\n\n        //allow setting options with data attributes\n        //data-api options will be overwritten with custom javascript options\n        options = $.extend(this.element.data(), options);\n\n        //html template for the picker UI\n        if (typeof options.template !== 'string' && !(options.template instanceof $))\n            options.template = '<div class=\"daterangepicker dropdown-menu\">' +\n                '<div class=\"calendar left\">' +\n                    '<div class=\"daterangepicker_input\">' +\n                      '<input class=\"input-mini form-control\" type=\"text\" name=\"daterangepicker_start\" value=\"\" />' +\n                      '<i class=\"fa fa-calendar glyphicon glyphicon-calendar\"></i>' +\n                      '<div class=\"calendar-time\">' +\n                        '<div></div>' +\n                        '<i class=\"fa fa-clock-o glyphicon glyphicon-time\"></i>' +\n                      '</div>' +\n                    '</div>' +\n                    '<div class=\"calendar-table\"></div>' +\n                '</div>' +\n                '<div class=\"calendar right\">' +\n                    '<div class=\"daterangepicker_input\">' +\n                      '<input class=\"input-mini form-control\" type=\"text\" name=\"daterangepicker_end\" value=\"\" />' +\n                      '<i class=\"fa fa-calendar glyphicon glyphicon-calendar\"></i>' +\n                      '<div class=\"calendar-time\">' +\n                        '<div></div>' +\n                        '<i class=\"fa fa-clock-o glyphicon glyphicon-time\"></i>' +\n                      '</div>' +\n                    '</div>' +\n                    '<div class=\"calendar-table\"></div>' +\n                '</div>' +\n                '<div class=\"ranges\">' +\n                    '<div class=\"range_inputs\">' +\n                        '<button class=\"applyBtn\" disabled=\"disabled\" type=\"button\"></button> ' +\n                        '<button class=\"cancelBtn\" type=\"button\"></button>' +\n                    '</div>' +\n                '</div>' +\n            '</div>';\n\n        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);\n        this.container = $(options.template).appendTo(this.parentEl);\n\n        //\n        // handle all the possible options overriding defaults\n        //\n\n        if (typeof options.locale === 'object') {\n\n            if (typeof options.locale.direction === 'string')\n                this.locale.direction = options.locale.direction;\n\n            if (typeof options.locale.format === 'string')\n                this.locale.format = options.locale.format;\n\n            if (typeof options.locale.separator === 'string')\n                this.locale.separator = options.locale.separator;\n\n            if (typeof options.locale.daysOfWeek === 'object')\n                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();\n\n            if (typeof options.locale.monthNames === 'object')\n              this.locale.monthNames = options.locale.monthNames.slice();\n\n            if (typeof options.locale.firstDay === 'number')\n              this.locale.firstDay = options.locale.firstDay;\n\n            if (typeof options.locale.applyLabel === 'string')\n              this.locale.applyLabel = options.locale.applyLabel;\n\n            if (typeof options.locale.cancelLabel === 'string')\n              this.locale.cancelLabel = options.locale.cancelLabel;\n\n            if (typeof options.locale.weekLabel === 'string')\n              this.locale.weekLabel = options.locale.weekLabel;\n\n            if (typeof options.locale.customRangeLabel === 'string'){\n                //Support unicode chars in the custom range name.\n                var elem = document.createElement('textarea');\n                elem.innerHTML = options.locale.customRangeLabel;\n                var rangeHtml = elem.value;\n                this.locale.customRangeLabel = rangeHtml;\n            }\n        }\n        this.container.addClass(this.locale.direction);\n\n        if (typeof options.startDate === 'string')\n            this.startDate = moment(options.startDate, this.locale.format);\n\n        if (typeof options.endDate === 'string')\n            this.endDate = moment(options.endDate, this.locale.format);\n\n        if (typeof options.minDate === 'string')\n            this.minDate = moment(options.minDate, this.locale.format);\n\n        if (typeof options.maxDate === 'string')\n            this.maxDate = moment(options.maxDate, this.locale.format);\n\n        if (typeof options.startDate === 'object')\n            this.startDate = moment(options.startDate);\n\n        if (typeof options.endDate === 'object')\n            this.endDate = moment(options.endDate);\n\n        if (typeof options.minDate === 'object')\n            this.minDate = moment(options.minDate);\n\n        if (typeof options.maxDate === 'object')\n            this.maxDate = moment(options.maxDate);\n\n        // sanity check for bad options\n        if (this.minDate && this.startDate.isBefore(this.minDate))\n            this.startDate = this.minDate.clone();\n\n        // sanity check for bad options\n        if (this.maxDate && this.endDate.isAfter(this.maxDate))\n            this.endDate = this.maxDate.clone();\n\n        if (typeof options.applyClass === 'string')\n            this.applyClass = options.applyClass;\n\n        if (typeof options.cancelClass === 'string')\n            this.cancelClass = options.cancelClass;\n\n        if (typeof options.dateLimit === 'object')\n            this.dateLimit = options.dateLimit;\n\n        if (typeof options.opens === 'string')\n            this.opens = options.opens;\n\n        if (typeof options.drops === 'string')\n            this.drops = options.drops;\n\n        if (typeof options.showWeekNumbers === 'boolean')\n            this.showWeekNumbers = options.showWeekNumbers;\n\n        if (typeof options.showISOWeekNumbers === 'boolean')\n            this.showISOWeekNumbers = options.showISOWeekNumbers;\n\n        if (typeof options.buttonClasses === 'string')\n            this.buttonClasses = options.buttonClasses;\n\n        if (typeof options.buttonClasses === 'object')\n            this.buttonClasses = options.buttonClasses.join(' ');\n\n        if (typeof options.showDropdowns === 'boolean')\n            this.showDropdowns = options.showDropdowns;\n\n        if (typeof options.showCustomRangeLabel === 'boolean')\n            this.showCustomRangeLabel = options.showCustomRangeLabel;\n\n        if (typeof options.singleDatePicker === 'boolean') {\n            this.singleDatePicker = options.singleDatePicker;\n            if (this.singleDatePicker)\n                this.endDate = this.startDate.clone();\n        }\n\n        if (typeof options.timePicker === 'boolean')\n            this.timePicker = options.timePicker;\n\n        if (typeof options.timePickerSeconds === 'boolean')\n            this.timePickerSeconds = options.timePickerSeconds;\n\n        if (typeof options.timePickerIncrement === 'number')\n            this.timePickerIncrement = options.timePickerIncrement;\n\n        if (typeof options.timePicker24Hour === 'boolean')\n            this.timePicker24Hour = options.timePicker24Hour;\n\n        if (typeof options.autoApply === 'boolean')\n            this.autoApply = options.autoApply;\n\n        if (typeof options.autoUpdateInput === 'boolean')\n            this.autoUpdateInput = options.autoUpdateInput;\n\n        if (typeof options.linkedCalendars === 'boolean')\n            this.linkedCalendars = options.linkedCalendars;\n\n        if (typeof options.isInvalidDate === 'function')\n            this.isInvalidDate = options.isInvalidDate;\n\n        if (typeof options.isCustomDate === 'function')\n            this.isCustomDate = options.isCustomDate;\n\n        if (typeof options.alwaysShowCalendars === 'boolean')\n            this.alwaysShowCalendars = options.alwaysShowCalendars;\n\n        // update day names order to firstDay\n        if (this.locale.firstDay != 0) {\n            var iterator = this.locale.firstDay;\n            while (iterator > 0) {\n                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());\n                iterator--;\n            }\n        }\n\n        var start, end, range;\n\n        //if no start/end dates set, check if an input element contains initial values\n        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {\n            if ($(this.element).is('input[type=text]')) {\n                var val = $(this.element).val(),\n                    split = val.split(this.locale.separator);\n\n                start = end = null;\n\n                if (split.length == 2) {\n                    start = moment(split[0], this.locale.format);\n                    end = moment(split[1], this.locale.format);\n                } else if (this.singleDatePicker && val !== \"\") {\n                    start = moment(val, this.locale.format);\n                    end = moment(val, this.locale.format);\n                }\n                if (start !== null && end !== null) {\n                    this.setStartDate(start);\n                    this.setEndDate(end);\n                }\n            }\n        }\n\n        if (typeof options.ranges === 'object') {\n            for (range in options.ranges) {\n\n                if (typeof options.ranges[range][0] === 'string')\n                    start = moment(options.ranges[range][0], this.locale.format);\n                else\n                    start = moment(options.ranges[range][0]);\n\n                if (typeof options.ranges[range][1] === 'string')\n                    end = moment(options.ranges[range][1], this.locale.format);\n                else\n                    end = moment(options.ranges[range][1]);\n\n                // If the start or end date exceed those allowed by the minDate or dateLimit\n                // options, shorten the range to the allowable period.\n                if (this.minDate && start.isBefore(this.minDate))\n                    start = this.minDate.clone();\n\n                var maxDate = this.maxDate;\n                if (this.dateLimit && maxDate && start.clone().add(this.dateLimit).isAfter(maxDate))\n                    maxDate = start.clone().add(this.dateLimit);\n                if (maxDate && end.isAfter(maxDate))\n                    end = maxDate.clone();\n\n                // If the end of the range is before the minimum or the start of the range is\n                // after the maximum, don't display this range option at all.\n                if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day')) \n                  || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))\n                    continue;\n\n                //Support unicode chars in the range names.\n                var elem = document.createElement('textarea');\n                elem.innerHTML = range;\n                var rangeHtml = elem.value;\n\n                this.ranges[rangeHtml] = [start, end];\n            }\n\n            var list = '<ul>';\n            for (range in this.ranges) {\n                list += '<li data-range-key=\"' + range + '\">' + range + '</li>';\n            }\n            if (this.showCustomRangeLabel) {\n                list += '<li data-range-key=\"' + this.locale.customRangeLabel + '\">' + this.locale.customRangeLabel + '</li>';\n            }\n            list += '</ul>';\n            this.container.find('.ranges').prepend(list);\n        }\n\n        if (typeof cb === 'function') {\n            this.callback = cb;\n        }\n\n        if (!this.timePicker) {\n            this.startDate = this.startDate.startOf('day');\n            this.endDate = this.endDate.endOf('day');\n            this.container.find('.calendar-time').hide();\n        }\n\n        //can't be used together for now\n        if (this.timePicker && this.autoApply)\n            this.autoApply = false;\n\n        if (this.autoApply && typeof options.ranges !== 'object') {\n            this.container.find('.ranges').hide();\n        } else if (this.autoApply) {\n            this.container.find('.applyBtn, .cancelBtn').addClass('hide');\n        }\n\n        if (this.singleDatePicker) {\n            this.container.addClass('single');\n            this.container.find('.calendar.left').addClass('single');\n            this.container.find('.calendar.left').show();\n            this.container.find('.calendar.right').hide();\n            this.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();\n            if (this.timePicker) {\n                this.container.find('.ranges ul').hide();\n            } else {\n                this.container.find('.ranges').hide();\n            }\n        }\n\n        if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {\n            this.container.addClass('show-calendar');\n        }\n\n        this.container.addClass('opens' + this.opens);\n\n        //swap the position of the predefined ranges if opens right\n        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {\n            this.container.find('.ranges').prependTo( this.container.find('.calendar.left').parent() );\n        }\n\n        //apply CSS classes and labels to buttons\n        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);\n        if (this.applyClass.length)\n            this.container.find('.applyBtn').addClass(this.applyClass);\n        if (this.cancelClass.length)\n            this.container.find('.cancelBtn').addClass(this.cancelClass);\n        this.container.find('.applyBtn').html(this.locale.applyLabel);\n        this.container.find('.cancelBtn').html(this.locale.cancelLabel);\n\n        //\n        // event listeners\n        //\n\n        this.container.find('.calendar')\n            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))\n            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))\n            .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))\n            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))\n            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))\n            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))\n            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))\n            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))\n            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))\n            .on('focus.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsFocused, this))\n            .on('blur.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsBlurred, this))\n            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));\n\n        this.container.find('.ranges')\n            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))\n            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))\n            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))\n            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))\n            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));\n\n        if (this.element.is('input') || this.element.is('button')) {\n            this.element.on({\n                'click.daterangepicker': $.proxy(this.show, this),\n                'focus.daterangepicker': $.proxy(this.show, this),\n                'keyup.daterangepicker': $.proxy(this.elementChanged, this),\n                'keydown.daterangepicker': $.proxy(this.keydown, this)\n            });\n        } else {\n            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));\n        }\n\n        //\n        // if attached to a text input, set the initial value\n        //\n\n        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {\n            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));\n            this.element.trigger('change');\n        } else if (this.element.is('input') && this.autoUpdateInput) {\n            this.element.val(this.startDate.format(this.locale.format));\n            this.element.trigger('change');\n        }\n\n    };\n\n    DateRangePicker.prototype = {\n\n        constructor: DateRangePicker,\n\n        setStartDate: function(startDate) {\n            if (typeof startDate === 'string')\n                this.startDate = moment(startDate, this.locale.format);\n\n            if (typeof startDate === 'object')\n                this.startDate = moment(startDate);\n\n            if (!this.timePicker)\n                this.startDate = this.startDate.startOf('day');\n\n            if (this.timePicker && this.timePickerIncrement)\n                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);\n\n            if (this.minDate && this.startDate.isBefore(this.minDate)) {\n                this.startDate = this.minDate.clone();\n                if (this.timePicker && this.timePickerIncrement)\n                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);\n            }\n\n            if (this.maxDate && this.startDate.isAfter(this.maxDate)) {\n                this.startDate = this.maxDate.clone();\n                if (this.timePicker && this.timePickerIncrement)\n                    this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);\n            }\n\n            if (!this.isShowing)\n                this.updateElement();\n\n            this.updateMonthsInView();\n        },\n\n        setEndDate: function(endDate) {\n            if (typeof endDate === 'string')\n                this.endDate = moment(endDate, this.locale.format);\n\n            if (typeof endDate === 'object')\n                this.endDate = moment(endDate);\n\n            if (!this.timePicker)\n                this.endDate = this.endDate.endOf('day');\n\n            if (this.timePicker && this.timePickerIncrement)\n                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);\n\n            if (this.endDate.isBefore(this.startDate))\n                this.endDate = this.startDate.clone();\n\n            if (this.maxDate && this.endDate.isAfter(this.maxDate))\n                this.endDate = this.maxDate.clone();\n\n            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))\n                this.endDate = this.startDate.clone().add(this.dateLimit);\n\n            this.previousRightTime = this.endDate.clone();\n\n            if (!this.isShowing)\n                this.updateElement();\n\n            this.updateMonthsInView();\n        },\n\n        isInvalidDate: function() {\n            return false;\n        },\n\n        isCustomDate: function() {\n            return false;\n        },\n\n        updateView: function() {\n            if (this.timePicker) {\n                this.renderTimePicker('left');\n                this.renderTimePicker('right');\n                if (!this.endDate) {\n                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');\n                } else {\n                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');\n                }\n            }\n            if (this.endDate) {\n                this.container.find('input[name=\"daterangepicker_end\"]').removeClass('active');\n                this.container.find('input[name=\"daterangepicker_start\"]').addClass('active');\n            } else {\n                this.container.find('input[name=\"daterangepicker_end\"]').addClass('active');\n                this.container.find('input[name=\"daterangepicker_start\"]').removeClass('active');\n            }\n            this.updateMonthsInView();\n            this.updateCalendars();\n            this.updateFormInputs();\n        },\n\n        updateMonthsInView: function() {\n            if (this.endDate) {\n\n                //if both dates are visible already, do nothing\n                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&\n                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))\n                    &&\n                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))\n                    ) {\n                    return;\n                }\n\n                this.leftCalendar.month = this.startDate.clone().date(2);\n                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {\n                    this.rightCalendar.month = this.endDate.clone().date(2);\n                } else {\n                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');\n                }\n\n            } else {\n                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {\n                    this.leftCalendar.month = this.startDate.clone().date(2);\n                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');\n                }\n            }\n            if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {\n              this.rightCalendar.month = this.maxDate.clone().date(2);\n              this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');\n            }\n        },\n\n        updateCalendars: function() {\n\n            if (this.timePicker) {\n                var hour, minute, second;\n                if (this.endDate) {\n                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);\n                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);\n                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;\n                    if (!this.timePicker24Hour) {\n                        var ampm = this.container.find('.left .ampmselect').val();\n                        if (ampm === 'PM' && hour < 12)\n                            hour += 12;\n                        if (ampm === 'AM' && hour === 12)\n                            hour = 0;\n                    }\n                } else {\n                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);\n                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);\n                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;\n                    if (!this.timePicker24Hour) {\n                        var ampm = this.container.find('.right .ampmselect').val();\n                        if (ampm === 'PM' && hour < 12)\n                            hour += 12;\n                        if (ampm === 'AM' && hour === 12)\n                            hour = 0;\n                    }\n                }\n                this.leftCalendar.month.hour(hour).minute(minute).second(second);\n                this.rightCalendar.month.hour(hour).minute(minute).second(second);\n            }\n\n            this.renderCalendar('left');\n            this.renderCalendar('right');\n\n            //highlight any predefined range matching the current start and end dates\n            this.container.find('.ranges li').removeClass('active');\n            if (this.endDate == null) return;\n\n            this.calculateChosenLabel();\n        },\n\n        renderCalendar: function(side) {\n\n            //\n            // Build the matrix of dates that will populate the calendar\n            //\n\n            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;\n            var month = calendar.month.month();\n            var year = calendar.month.year();\n            var hour = calendar.month.hour();\n            var minute = calendar.month.minute();\n            var second = calendar.month.second();\n            var daysInMonth = moment([year, month]).daysInMonth();\n            var firstDay = moment([year, month, 1]);\n            var lastDay = moment([year, month, daysInMonth]);\n            var lastMonth = moment(firstDay).subtract(1, 'month').month();\n            var lastYear = moment(firstDay).subtract(1, 'month').year();\n            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();\n            var dayOfWeek = firstDay.day();\n\n            //initialize a 6 rows x 7 columns array for the calendar\n            var calendar = [];\n            calendar.firstDay = firstDay;\n            calendar.lastDay = lastDay;\n\n            for (var i = 0; i < 6; i++) {\n                calendar[i] = [];\n            }\n\n            //populate the calendar with date objects\n            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;\n            if (startDay > daysInLastMonth)\n                startDay -= 7;\n\n            if (dayOfWeek == this.locale.firstDay)\n                startDay = daysInLastMonth - 6;\n\n            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);\n\n            var col, row;\n            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {\n                if (i > 0 && col % 7 === 0) {\n                    col = 0;\n                    row++;\n                }\n                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);\n                curDate.hour(12);\n\n                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {\n                    calendar[row][col] = this.minDate.clone();\n                }\n\n                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {\n                    calendar[row][col] = this.maxDate.clone();\n                }\n\n            }\n\n            //make the calendar object available to hoverDate/clickDate\n            if (side == 'left') {\n                this.leftCalendar.calendar = calendar;\n            } else {\n                this.rightCalendar.calendar = calendar;\n            }\n\n            //\n            // Display the calendar\n            //\n\n            var minDate = side == 'left' ? this.minDate : this.startDate;\n            var maxDate = this.maxDate;\n            var selected = side == 'left' ? this.startDate : this.endDate;\n            var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};\n\n            var html = '<table class=\"table-condensed\">';\n            html += '<thead>';\n            html += '<tr>';\n\n            // add empty cell for week number\n            if (this.showWeekNumbers || this.showISOWeekNumbers)\n                html += '<th></th>';\n\n            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {\n                html += '<th class=\"prev available\"><i class=\"fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '\"></i></th>';\n            } else {\n                html += '<th></th>';\n            }\n\n            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(\" YYYY\");\n\n            if (this.showDropdowns) {\n                var currentMonth = calendar[1][1].month();\n                var currentYear = calendar[1][1].year();\n                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);\n                var minYear = (minDate && minDate.year()) || (currentYear - 50);\n                var inMinYear = currentYear == minYear;\n                var inMaxYear = currentYear == maxYear;\n\n                var monthHtml = '<select class=\"monthselect\">';\n                for (var m = 0; m < 12; m++) {\n                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {\n                        monthHtml += \"<option value='\" + m + \"'\" +\n                            (m === currentMonth ? \" selected='selected'\" : \"\") +\n                            \">\" + this.locale.monthNames[m] + \"</option>\";\n                    } else {\n                        monthHtml += \"<option value='\" + m + \"'\" +\n                            (m === currentMonth ? \" selected='selected'\" : \"\") +\n                            \" disabled='disabled'>\" + this.locale.monthNames[m] + \"</option>\";\n                    }\n                }\n                monthHtml += \"</select>\";\n\n                var yearHtml = '<select class=\"yearselect\">';\n                for (var y = minYear; y <= maxYear; y++) {\n                    yearHtml += '<option value=\"' + y + '\"' +\n                        (y === currentYear ? ' selected=\"selected\"' : '') +\n                        '>' + y + '</option>';\n                }\n                yearHtml += '</select>';\n\n                dateHtml = monthHtml + yearHtml;\n            }\n\n            html += '<th colspan=\"5\" class=\"month\">' + dateHtml + '</th>';\n            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {\n                html += '<th class=\"next available\"><i class=\"fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '\"></i></th>';\n            } else {\n                html += '<th></th>';\n            }\n\n            html += '</tr>';\n            html += '<tr>';\n\n            // add week number label\n            if (this.showWeekNumbers || this.showISOWeekNumbers)\n                html += '<th class=\"week\">' + this.locale.weekLabel + '</th>';\n\n            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {\n                html += '<th>' + dayOfWeek + '</th>';\n            });\n\n            html += '</tr>';\n            html += '</thead>';\n            html += '<tbody>';\n\n            //adjust maxDate to reflect the dateLimit setting in order to\n            //grey out end dates beyond the dateLimit\n            if (this.endDate == null && this.dateLimit) {\n                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');\n                if (!maxDate || maxLimit.isBefore(maxDate)) {\n                    maxDate = maxLimit;\n                }\n            }\n\n            for (var row = 0; row < 6; row++) {\n                html += '<tr>';\n\n                // add week number\n                if (this.showWeekNumbers)\n                    html += '<td class=\"week\">' + calendar[row][0].week() + '</td>';\n                else if (this.showISOWeekNumbers)\n                    html += '<td class=\"week\">' + calendar[row][0].isoWeek() + '</td>';\n\n                for (var col = 0; col < 7; col++) {\n\n                    var classes = [];\n\n                    //highlight today's date\n                    if (calendar[row][col].isSame(new Date(), \"day\"))\n                        classes.push('today');\n\n                    //highlight weekends\n                    if (calendar[row][col].isoWeekday() > 5)\n                        classes.push('weekend');\n\n                    //grey out the dates in other months displayed at beginning and end of this calendar\n                    if (calendar[row][col].month() != calendar[1][1].month())\n                        classes.push('off');\n\n                    //don't allow selection of dates before the minimum date\n                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))\n                        classes.push('off', 'disabled');\n\n                    //don't allow selection of dates after the maximum date\n                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))\n                        classes.push('off', 'disabled');\n\n                    //don't allow selection of date if a custom function decides it's invalid\n                    if (this.isInvalidDate(calendar[row][col]))\n                        classes.push('off', 'disabled');\n\n                    //highlight the currently selected start date\n                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))\n                        classes.push('active', 'start-date');\n\n                    //highlight the currently selected end date\n                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))\n                        classes.push('active', 'end-date');\n\n                    //highlight dates in-between the selected dates\n                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)\n                        classes.push('in-range');\n\n                    //apply custom classes for this date\n                    var isCustom = this.isCustomDate(calendar[row][col]);\n                    if (isCustom !== false) {\n                        if (typeof isCustom === 'string')\n                            classes.push(isCustom);\n                        else\n                            Array.prototype.push.apply(classes, isCustom);\n                    }\n\n                    var cname = '', disabled = false;\n                    for (var i = 0; i < classes.length; i++) {\n                        cname += classes[i] + ' ';\n                        if (classes[i] == 'disabled')\n                            disabled = true;\n                    }\n                    if (!disabled)\n                        cname += 'available';\n\n                    html += '<td class=\"' + cname.replace(/^\\s+|\\s+$/g, '') + '\" data-title=\"' + 'r' + row + 'c' + col + '\">' + calendar[row][col].date() + '</td>';\n\n                }\n                html += '</tr>';\n            }\n\n            html += '</tbody>';\n            html += '</table>';\n\n            this.container.find('.calendar.' + side + ' .calendar-table').html(html);\n\n        },\n\n        renderTimePicker: function(side) {\n\n            // Don't bother updating the time picker if it's currently disabled\n            // because an end date hasn't been clicked yet\n            if (side == 'right' && !this.endDate) return;\n\n            var html, selected, minDate, maxDate = this.maxDate;\n\n            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))\n                maxDate = this.startDate.clone().add(this.dateLimit);\n\n            if (side == 'left') {\n                selected = this.startDate.clone();\n                minDate = this.minDate;\n            } else if (side == 'right') {\n                selected = this.endDate.clone();\n                minDate = this.startDate;\n\n                //Preserve the time already selected\n                var timeSelector = this.container.find('.calendar.right .calendar-time div');\n                if (timeSelector.html() != '') {\n\n                    selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());\n                    selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());\n                    selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());\n\n                    if (!this.timePicker24Hour) {\n                        var ampm = timeSelector.find('.ampmselect option:selected').val();\n                        if (ampm === 'PM' && selected.hour() < 12)\n                            selected.hour(selected.hour() + 12);\n                        if (ampm === 'AM' && selected.hour() === 12)\n                            selected.hour(0);\n                    }\n\n                }\n\n                if (selected.isBefore(this.startDate))\n                    selected = this.startDate.clone();\n\n                if (maxDate && selected.isAfter(maxDate))\n                    selected = maxDate.clone();\n\n            }\n\n            //\n            // hours\n            //\n\n            html = '<select class=\"hourselect\">';\n\n            var start = this.timePicker24Hour ? 0 : 1;\n            var end = this.timePicker24Hour ? 23 : 12;\n\n            for (var i = start; i <= end; i++) {\n                var i_in_24 = i;\n                if (!this.timePicker24Hour)\n                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);\n\n                var time = selected.clone().hour(i_in_24);\n                var disabled = false;\n                if (minDate && time.minute(59).isBefore(minDate))\n                    disabled = true;\n                if (maxDate && time.minute(0).isAfter(maxDate))\n                    disabled = true;\n\n                if (i_in_24 == selected.hour() && !disabled) {\n                    html += '<option value=\"' + i + '\" selected=\"selected\">' + i + '</option>';\n                } else if (disabled) {\n                    html += '<option value=\"' + i + '\" disabled=\"disabled\" class=\"disabled\">' + i + '</option>';\n                } else {\n                    html += '<option value=\"' + i + '\">' + i + '</option>';\n                }\n            }\n\n            html += '</select> ';\n\n            //\n            // minutes\n            //\n\n            html += ': <select class=\"minuteselect\">';\n\n            for (var i = 0; i < 60; i += this.timePickerIncrement) {\n                var padded = i < 10 ? '0' + i : i;\n                var time = selected.clone().minute(i);\n\n                var disabled = false;\n                if (minDate && time.second(59).isBefore(minDate))\n                    disabled = true;\n                if (maxDate && time.second(0).isAfter(maxDate))\n                    disabled = true;\n\n                if (selected.minute() == i && !disabled) {\n                    html += '<option value=\"' + i + '\" selected=\"selected\">' + padded + '</option>';\n                } else if (disabled) {\n                    html += '<option value=\"' + i + '\" disabled=\"disabled\" class=\"disabled\">' + padded + '</option>';\n                } else {\n                    html += '<option value=\"' + i + '\">' + padded + '</option>';\n                }\n            }\n\n            html += '</select> ';\n\n            //\n            // seconds\n            //\n\n            if (this.timePickerSeconds) {\n                html += ': <select class=\"secondselect\">';\n\n                for (var i = 0; i < 60; i++) {\n                    var padded = i < 10 ? '0' + i : i;\n                    var time = selected.clone().second(i);\n\n                    var disabled = false;\n                    if (minDate && time.isBefore(minDate))\n                        disabled = true;\n                    if (maxDate && time.isAfter(maxDate))\n                        disabled = true;\n\n                    if (selected.second() == i && !disabled) {\n                        html += '<option value=\"' + i + '\" selected=\"selected\">' + padded + '</option>';\n                    } else if (disabled) {\n                        html += '<option value=\"' + i + '\" disabled=\"disabled\" class=\"disabled\">' + padded + '</option>';\n                    } else {\n                        html += '<option value=\"' + i + '\">' + padded + '</option>';\n                    }\n                }\n\n                html += '</select> ';\n            }\n\n            //\n            // AM/PM\n            //\n\n            if (!this.timePicker24Hour) {\n                html += '<select class=\"ampmselect\">';\n\n                var am_html = '';\n                var pm_html = '';\n\n                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))\n                    am_html = ' disabled=\"disabled\" class=\"disabled\"';\n\n                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))\n                    pm_html = ' disabled=\"disabled\" class=\"disabled\"';\n\n                if (selected.hour() >= 12) {\n                    html += '<option value=\"AM\"' + am_html + '>AM</option><option value=\"PM\" selected=\"selected\"' + pm_html + '>PM</option>';\n                } else {\n                    html += '<option value=\"AM\" selected=\"selected\"' + am_html + '>AM</option><option value=\"PM\"' + pm_html + '>PM</option>';\n                }\n\n                html += '</select>';\n            }\n\n            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);\n\n        },\n\n        updateFormInputs: function() {\n\n            //ignore mouse movements while an above-calendar text input has focus\n            if (this.container.find('input[name=daterangepicker_start]').is(\":focus\") || this.container.find('input[name=daterangepicker_end]').is(\":focus\"))\n                return;\n\n            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));\n            if (this.endDate)\n                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));\n\n            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {\n                this.container.find('button.applyBtn').removeAttr('disabled');\n            } else {\n                this.container.find('button.applyBtn').attr('disabled', 'disabled');\n            }\n\n        },\n\n        move: function() {\n            var parentOffset = { top: 0, left: 0 },\n                containerTop;\n            var parentRightEdge = $(window).width();\n            if (!this.parentEl.is('body')) {\n                parentOffset = {\n                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),\n                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()\n                };\n                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;\n            }\n\n            if (this.drops == 'up')\n                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;\n            else\n                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;\n            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');\n\n            if (this.opens == 'left') {\n                this.container.css({\n                    top: containerTop,\n                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),\n                    left: 'auto'\n                });\n                if (this.container.offset().left < 0) {\n                    this.container.css({\n                        right: 'auto',\n                        left: 9\n                    });\n                }\n            } else if (this.opens == 'center') {\n                this.container.css({\n                    top: containerTop,\n                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2\n                            - this.container.outerWidth() / 2,\n                    right: 'auto'\n                });\n                if (this.container.offset().left < 0) {\n                    this.container.css({\n                        right: 'auto',\n                        left: 9\n                    });\n                }\n            } else {\n                this.container.css({\n                    top: containerTop,\n                    left: this.element.offset().left - parentOffset.left,\n                    right: 'auto'\n                });\n                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {\n                    this.container.css({\n                        left: 'auto',\n                        right: 0\n                    });\n                }\n            }\n        },\n\n        show: function(e) {\n            if (this.isShowing) return;\n\n            // Create a click proxy that is private to this instance of datepicker, for unbinding\n            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);\n\n            // Bind global datepicker mousedown for hiding and\n            $(document)\n              .on('mousedown.daterangepicker', this._outsideClickProxy)\n              // also support mobile devices\n              .on('touchend.daterangepicker', this._outsideClickProxy)\n              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them\n              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)\n              // and also close when focus changes to outside the picker (eg. tabbing between controls)\n              .on('focusin.daterangepicker', this._outsideClickProxy);\n\n            // Reposition the picker if the window is resized while it's open\n            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));\n\n            this.oldStartDate = this.startDate.clone();\n            this.oldEndDate = this.endDate.clone();\n            this.previousRightTime = this.endDate.clone();\n\n            this.updateView();\n            this.container.show();\n            this.move();\n            this.element.trigger('show.daterangepicker', this);\n            this.isShowing = true;\n        },\n\n        hide: function(e) {\n            if (!this.isShowing) return;\n\n            //incomplete date selection, revert to last values\n            if (!this.endDate) {\n                this.startDate = this.oldStartDate.clone();\n                this.endDate = this.oldEndDate.clone();\n            }\n\n            //if a new date range was selected, invoke the user callback function\n            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))\n                this.callback(this.startDate, this.endDate, this.chosenLabel);\n\n            //if picker is attached to a text input, update it\n            this.updateElement();\n\n            $(document).off('.daterangepicker');\n            $(window).off('.daterangepicker');\n            this.container.hide();\n            this.element.trigger('hide.daterangepicker', this);\n            this.isShowing = false;\n        },\n\n        toggle: function(e) {\n            if (this.isShowing) {\n                this.hide();\n            } else {\n                this.show();\n            }\n        },\n\n        outsideClick: function(e) {\n            var target = $(e.target);\n            // if the page is clicked anywhere except within the daterangerpicker/button\n            // itself then call this.hide()\n            if (\n                // ie modal dialog fix\n                e.type == \"focusin\" ||\n                target.closest(this.element).length ||\n                target.closest(this.container).length ||\n                target.closest('.calendar-table').length\n                ) return;\n            this.hide();\n            this.element.trigger('outsideClick.daterangepicker', this);\n        },\n\n        showCalendars: function() {\n            this.container.addClass('show-calendar');\n            this.move();\n            this.element.trigger('showCalendar.daterangepicker', this);\n        },\n\n        hideCalendars: function() {\n            this.container.removeClass('show-calendar');\n            this.element.trigger('hideCalendar.daterangepicker', this);\n        },\n\n        hoverRange: function(e) {\n\n            //ignore mouse movements while an above-calendar text input has focus\n            if (this.container.find('input[name=daterangepicker_start]').is(\":focus\") || this.container.find('input[name=daterangepicker_end]').is(\":focus\"))\n                return;\n\n            var label = e.target.getAttribute('data-range-key');\n\n            if (label == this.locale.customRangeLabel) {\n                this.updateView();\n            } else {\n                var dates = this.ranges[label];\n                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));\n                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));\n            }\n\n        },\n\n        clickRange: function(e) {\n            var label = e.target.getAttribute('data-range-key');\n            this.chosenLabel = label;\n            if (label == this.locale.customRangeLabel) {\n                this.showCalendars();\n            } else {\n                var dates = this.ranges[label];\n                this.startDate = dates[0];\n                this.endDate = dates[1];\n\n                if (!this.timePicker) {\n                    this.startDate.startOf('day');\n                    this.endDate.endOf('day');\n                }\n\n                if (!this.alwaysShowCalendars)\n                    this.hideCalendars();\n                this.clickApply();\n            }\n        },\n\n        clickPrev: function(e) {\n            var cal = $(e.target).parents('.calendar');\n            if (cal.hasClass('left')) {\n                this.leftCalendar.month.subtract(1, 'month');\n                if (this.linkedCalendars)\n                    this.rightCalendar.month.subtract(1, 'month');\n            } else {\n                this.rightCalendar.month.subtract(1, 'month');\n            }\n            this.updateCalendars();\n        },\n\n        clickNext: function(e) {\n            var cal = $(e.target).parents('.calendar');\n            if (cal.hasClass('left')) {\n                this.leftCalendar.month.add(1, 'month');\n            } else {\n                this.rightCalendar.month.add(1, 'month');\n                if (this.linkedCalendars)\n                    this.leftCalendar.month.add(1, 'month');\n            }\n            this.updateCalendars();\n        },\n\n        hoverDate: function(e) {\n\n            //ignore mouse movements while an above-calendar text input has focus\n            //if (this.container.find('input[name=daterangepicker_start]').is(\":focus\") || this.container.find('input[name=daterangepicker_end]').is(\":focus\"))\n            //    return;\n\n            //ignore dates that can't be selected\n            if (!$(e.target).hasClass('available')) return;\n\n            //have the text inputs above calendars reflect the date being hovered over\n            var title = $(e.target).attr('data-title');\n            var row = title.substr(1, 1);\n            var col = title.substr(3, 1);\n            var cal = $(e.target).parents('.calendar');\n            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];\n\n            if (this.endDate && !this.container.find('input[name=daterangepicker_start]').is(\":focus\")) {\n                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));\n            } else if (!this.endDate && !this.container.find('input[name=daterangepicker_end]').is(\":focus\")) {\n                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));\n            }\n\n            //highlight the dates between the start date and the date being hovered as a potential end date\n            var leftCalendar = this.leftCalendar;\n            var rightCalendar = this.rightCalendar;\n            var startDate = this.startDate;\n            if (!this.endDate) {\n                this.container.find('.calendar tbody td').each(function(index, el) {\n\n                    //skip week numbers, only look at dates\n                    if ($(el).hasClass('week')) return;\n\n                    var title = $(el).attr('data-title');\n                    var row = title.substr(1, 1);\n                    var col = title.substr(3, 1);\n                    var cal = $(el).parents('.calendar');\n                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];\n\n                    if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {\n                        $(el).addClass('in-range');\n                    } else {\n                        $(el).removeClass('in-range');\n                    }\n\n                });\n            }\n\n        },\n\n        clickDate: function(e) {\n\n            if (!$(e.target).hasClass('available')) return;\n\n            var title = $(e.target).attr('data-title');\n            var row = title.substr(1, 1);\n            var col = title.substr(3, 1);\n            var cal = $(e.target).parents('.calendar');\n            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];\n\n            //\n            // this function needs to do a few things:\n            // * alternate between selecting a start and end date for the range,\n            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date\n            // * if autoapply is enabled, and an end date was chosen, apply the selection\n            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately\n            // * if one of the inputs above the calendars was focused, cancel that manual input\n            //\n\n            if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start\n                if (this.timePicker) {\n                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);\n                    if (!this.timePicker24Hour) {\n                        var ampm = this.container.find('.left .ampmselect').val();\n                        if (ampm === 'PM' && hour < 12)\n                            hour += 12;\n                        if (ampm === 'AM' && hour === 12)\n                            hour = 0;\n                    }\n                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);\n                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;\n                    date = date.clone().hour(hour).minute(minute).second(second);\n                }\n                this.endDate = null;\n                this.setStartDate(date.clone());\n            } else if (!this.endDate && date.isBefore(this.startDate)) {\n                //special case: clicking the same date for start/end,\n                //but the time of the end date is before the start date\n                this.setEndDate(this.startDate.clone());\n            } else { // picking end\n                if (this.timePicker) {\n                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);\n                    if (!this.timePicker24Hour) {\n                        var ampm = this.container.find('.right .ampmselect').val();\n                        if (ampm === 'PM' && hour < 12)\n                            hour += 12;\n                        if (ampm === 'AM' && hour === 12)\n                            hour = 0;\n                    }\n                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);\n                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;\n                    date = date.clone().hour(hour).minute(minute).second(second);\n                }\n                this.setEndDate(date.clone());\n                if (this.autoApply) {\n                  this.calculateChosenLabel();\n                  this.clickApply();\n                }\n            }\n\n            if (this.singleDatePicker) {\n                this.setEndDate(this.startDate);\n                if (!this.timePicker)\n                    this.clickApply();\n            }\n\n            this.updateView();\n\n            //This is to cancel the blur event handler if the mouse was in one of the inputs\n            e.stopPropagation();\n\n        },\n\n        calculateChosenLabel: function () {\n            var customRange = true;\n            var i = 0;\n            for (var range in this.ranges) {\n                if (this.timePicker) {\n                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {\n                        customRange = false;\n                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();\n                        break;\n                    }\n                } else {\n                    //ignore times when comparing dates if time picker is not enabled\n                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {\n                        customRange = false;\n                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();\n                        break;\n                    }\n                }\n                i++;\n            }\n            if (customRange) {\n                if (this.showCustomRangeLabel) {\n                    this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();\n                } else {\n                    this.chosenLabel = null;\n                }\n                this.showCalendars();\n            }\n        },\n\n        clickApply: function(e) {\n            this.hide();\n            this.element.trigger('apply.daterangepicker', this);\n        },\n\n        clickCancel: function(e) {\n            this.startDate = this.oldStartDate;\n            this.endDate = this.oldEndDate;\n            this.hide();\n            this.element.trigger('cancel.daterangepicker', this);\n        },\n\n        monthOrYearChanged: function(e) {\n            var isLeft = $(e.target).closest('.calendar').hasClass('left'),\n                leftOrRight = isLeft ? 'left' : 'right',\n                cal = this.container.find('.calendar.'+leftOrRight);\n\n            // Month must be Number for new moment versions\n            var month = parseInt(cal.find('.monthselect').val(), 10);\n            var year = cal.find('.yearselect').val();\n\n            if (!isLeft) {\n                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {\n                    month = this.startDate.month();\n                    year = this.startDate.year();\n                }\n            }\n\n            if (this.minDate) {\n                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {\n                    month = this.minDate.month();\n                    year = this.minDate.year();\n                }\n            }\n\n            if (this.maxDate) {\n                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {\n                    month = this.maxDate.month();\n                    year = this.maxDate.year();\n                }\n            }\n\n            if (isLeft) {\n                this.leftCalendar.month.month(month).year(year);\n                if (this.linkedCalendars)\n                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');\n            } else {\n                this.rightCalendar.month.month(month).year(year);\n                if (this.linkedCalendars)\n                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');\n            }\n            this.updateCalendars();\n        },\n\n        timeChanged: function(e) {\n\n            var cal = $(e.target).closest('.calendar'),\n                isLeft = cal.hasClass('left');\n\n            var hour = parseInt(cal.find('.hourselect').val(), 10);\n            var minute = parseInt(cal.find('.minuteselect').val(), 10);\n            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;\n\n            if (!this.timePicker24Hour) {\n                var ampm = cal.find('.ampmselect').val();\n                if (ampm === 'PM' && hour < 12)\n                    hour += 12;\n                if (ampm === 'AM' && hour === 12)\n                    hour = 0;\n            }\n\n            if (isLeft) {\n                var start = this.startDate.clone();\n                start.hour(hour);\n                start.minute(minute);\n                start.second(second);\n                this.setStartDate(start);\n                if (this.singleDatePicker) {\n                    this.endDate = this.startDate.clone();\n                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {\n                    this.setEndDate(start.clone());\n                }\n            } else if (this.endDate) {\n                var end = this.endDate.clone();\n                end.hour(hour);\n                end.minute(minute);\n                end.second(second);\n                this.setEndDate(end);\n            }\n\n            //update the calendars so all clickable dates reflect the new time component\n            this.updateCalendars();\n\n            //update the form inputs above the calendars with the new time\n            this.updateFormInputs();\n\n            //re-render the time pickers because changing one selection can affect what's enabled in another\n            this.renderTimePicker('left');\n            this.renderTimePicker('right');\n\n        },\n\n        formInputsChanged: function(e) {\n            var isRight = $(e.target).closest('.calendar').hasClass('right');\n            var start = moment(this.container.find('input[name=\"daterangepicker_start\"]').val(), this.locale.format);\n            var end = moment(this.container.find('input[name=\"daterangepicker_end\"]').val(), this.locale.format);\n\n            if (start.isValid() && end.isValid()) {\n\n                if (isRight && end.isBefore(start))\n                    start = end.clone();\n\n                this.setStartDate(start);\n                this.setEndDate(end);\n\n                if (isRight) {\n                    this.container.find('input[name=\"daterangepicker_start\"]').val(this.startDate.format(this.locale.format));\n                } else {\n                    this.container.find('input[name=\"daterangepicker_end\"]').val(this.endDate.format(this.locale.format));\n                }\n\n            }\n\n            this.updateView();\n        },\n\n        formInputsFocused: function(e) {\n\n            // Highlight the focused input\n            this.container.find('input[name=\"daterangepicker_start\"], input[name=\"daterangepicker_end\"]').removeClass('active');\n            $(e.target).addClass('active');\n\n            // Set the state such that if the user goes back to using a mouse, \n            // the calendars are aware we're selecting the end of the range, not\n            // the start. This allows someone to edit the end of a date range without\n            // re-selecting the beginning, by clicking on the end date input then\n            // using the calendar.\n            var isRight = $(e.target).closest('.calendar').hasClass('right');\n            if (isRight) {\n                this.endDate = null;\n                this.setStartDate(this.startDate.clone());\n                this.updateView();\n            }\n\n        },\n\n        formInputsBlurred: function(e) {\n\n            // this function has one purpose right now: if you tab from the first\n            // text input to the second in the UI, the endDate is nulled so that\n            // you can click another, but if you tab out without clicking anything\n            // or changing the input value, the old endDate should be retained\n\n            if (!this.endDate) {\n                var val = this.container.find('input[name=\"daterangepicker_end\"]').val();\n                var end = moment(val, this.locale.format);\n                if (end.isValid()) {\n                    this.setEndDate(end);\n                    this.updateView();\n                }\n            }\n\n        },\n\n        elementChanged: function() {\n            if (!this.element.is('input')) return;\n            if (!this.element.val().length) return;\n            if (this.element.val().length < this.locale.format.length) return;\n\n            var dateString = this.element.val().split(this.locale.separator),\n                start = null,\n                end = null;\n\n            if (dateString.length === 2) {\n                start = moment(dateString[0], this.locale.format);\n                end = moment(dateString[1], this.locale.format);\n            }\n\n            if (this.singleDatePicker || start === null || end === null) {\n                start = moment(this.element.val(), this.locale.format);\n                end = start;\n            }\n\n            if (!start.isValid() || !end.isValid()) return;\n\n            this.setStartDate(start);\n            this.setEndDate(end);\n            this.updateView();\n        },\n\n        keydown: function(e) {\n            //hide on tab or enter\n            if ((e.keyCode === 9) || (e.keyCode === 13)) {\n                this.hide();\n            }\n        },\n\n        updateElement: function() {\n            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {\n                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));\n                this.element.trigger('change');\n            } else if (this.element.is('input') && this.autoUpdateInput) {\n                this.element.val(this.startDate.format(this.locale.format));\n                this.element.trigger('change');\n            }\n        },\n\n        remove: function() {\n            this.container.remove();\n            this.element.off('.daterangepicker');\n            this.element.removeData();\n        }\n\n    };\n\n    $.fn.daterangepicker = function(options, callback) {\n        this.each(function() {\n            var el = $(this);\n            if (el.data('daterangepicker'))\n                el.data('daterangepicker').remove();\n            el.data('daterangepicker', new DateRangePicker(el, options, callback));\n        });\n        return this;\n    };\n\n    return DateRangePicker;\n\n}));\n"

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78)(__webpack_require__(525))

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(477);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(50)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../css-loader/index.js!./daterangepicker.css", function() {
			var newContent = require("!!./../css-loader/index.js!./daterangepicker.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(289);


/***/ }),

/***/ 78:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	if (typeof execScript !== "undefined")
		execScript(src);
	else
		eval.call(null, src);
}


/***/ })

/******/ });