/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/fetch-polyfill.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/fetch-polyfill.js":
/*!**********************************!*\
  !*** ./src/js/fetch-polyfill.js ***!
  \**********************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Headers\", function() { return Headers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Request\", function() { return Request; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Response\", function() { return Response; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMException\", function() { return DOMException; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetch\", function() { return fetch; });\n// https://github.com/github/fetch\nvar support = {\n  searchParams: 'URLSearchParams' in self,\n  iterable: 'Symbol' in self && 'iterator' in Symbol,\n  blob: 'FileReader' in self && 'Blob' in self && function () {\n    try {\n      new Blob();\n      return true;\n    } catch (e) {\n      return false;\n    }\n  }(),\n  formData: 'FormData' in self,\n  arrayBuffer: 'ArrayBuffer' in self\n};\n\nfunction isDataView(obj) {\n  return obj && DataView.prototype.isPrototypeOf(obj);\n}\n\nif (support.arrayBuffer) {\n  var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];\n\n  var isArrayBufferView = ArrayBuffer.isView || function (obj) {\n    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;\n  };\n}\n\nfunction normalizeName(name) {\n  if (typeof name !== 'string') {\n    name = String(name);\n  }\n\n  if (/[^a-z0-9\\-#$%&'*+.^_`|~]/i.test(name)) {\n    throw new TypeError('Invalid character in header field name');\n  }\n\n  return name.toLowerCase();\n}\n\nfunction normalizeValue(value) {\n  if (typeof value !== 'string') {\n    value = String(value);\n  }\n\n  return value;\n} // Build a destructive iterator for the value list\n\n\nfunction iteratorFor(items) {\n  var iterator = {\n    next: function next() {\n      var value = items.shift();\n      return {\n        done: value === undefined,\n        value: value\n      };\n    }\n  };\n\n  if (support.iterable) {\n    iterator[Symbol.iterator] = function () {\n      return iterator;\n    };\n  }\n\n  return iterator;\n}\n\nfunction Headers(headers) {\n  this.map = {};\n\n  if (headers instanceof Headers) {\n    headers.forEach(function (value, name) {\n      this.append(name, value);\n    }, this);\n  } else if (Array.isArray(headers)) {\n    headers.forEach(function (header) {\n      this.append(header[0], header[1]);\n    }, this);\n  } else if (headers) {\n    Object.getOwnPropertyNames(headers).forEach(function (name) {\n      this.append(name, headers[name]);\n    }, this);\n  }\n}\n\nHeaders.prototype.append = function (name, value) {\n  name = normalizeName(name);\n  value = normalizeValue(value);\n  var oldValue = this.map[name];\n  this.map[name] = oldValue ? oldValue + ', ' + value : value;\n};\n\nHeaders.prototype['delete'] = function (name) {\n  delete this.map[normalizeName(name)];\n};\n\nHeaders.prototype.get = function (name) {\n  name = normalizeName(name);\n  return this.has(name) ? this.map[name] : null;\n};\n\nHeaders.prototype.has = function (name) {\n  return this.map.hasOwnProperty(normalizeName(name));\n};\n\nHeaders.prototype.set = function (name, value) {\n  this.map[normalizeName(name)] = normalizeValue(value);\n};\n\nHeaders.prototype.forEach = function (callback, thisArg) {\n  for (var name in this.map) {\n    if (this.map.hasOwnProperty(name)) {\n      callback.call(thisArg, this.map[name], name, this);\n    }\n  }\n};\n\nHeaders.prototype.keys = function () {\n  var items = [];\n  this.forEach(function (value, name) {\n    items.push(name);\n  });\n  return iteratorFor(items);\n};\n\nHeaders.prototype.values = function () {\n  var items = [];\n  this.forEach(function (value) {\n    items.push(value);\n  });\n  return iteratorFor(items);\n};\n\nHeaders.prototype.entries = function () {\n  var items = [];\n  this.forEach(function (value, name) {\n    items.push([name, value]);\n  });\n  return iteratorFor(items);\n};\n\nif (support.iterable) {\n  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;\n}\n\nfunction consumed(body) {\n  if (body.bodyUsed) {\n    return Promise.reject(new TypeError('Already read'));\n  }\n\n  body.bodyUsed = true;\n}\n\nfunction fileReaderReady(reader) {\n  return new Promise(function (resolve, reject) {\n    reader.onload = function () {\n      resolve(reader.result);\n    };\n\n    reader.onerror = function () {\n      reject(reader.error);\n    };\n  });\n}\n\nfunction readBlobAsArrayBuffer(blob) {\n  var reader = new FileReader();\n  var promise = fileReaderReady(reader);\n  reader.readAsArrayBuffer(blob);\n  return promise;\n}\n\nfunction readBlobAsText(blob) {\n  var reader = new FileReader();\n  var promise = fileReaderReady(reader);\n  reader.readAsText(blob);\n  return promise;\n}\n\nfunction readArrayBufferAsText(buf) {\n  var view = new Uint8Array(buf);\n  var chars = new Array(view.length);\n\n  for (var i = 0; i < view.length; i++) {\n    chars[i] = String.fromCharCode(view[i]);\n  }\n\n  return chars.join('');\n}\n\nfunction bufferClone(buf) {\n  if (buf.slice) {\n    return buf.slice(0);\n  } else {\n    var view = new Uint8Array(buf.byteLength);\n    view.set(new Uint8Array(buf));\n    return view.buffer;\n  }\n}\n\nfunction Body() {\n  this.bodyUsed = false;\n\n  this._initBody = function (body) {\n    this._bodyInit = body;\n\n    if (!body) {\n      this._bodyText = '';\n    } else if (typeof body === 'string') {\n      this._bodyText = body;\n    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {\n      this._bodyBlob = body;\n    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {\n      this._bodyFormData = body;\n    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n      this._bodyText = body.toString();\n    } else if (support.arrayBuffer && support.blob && isDataView(body)) {\n      this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.\n\n      this._bodyInit = new Blob([this._bodyArrayBuffer]);\n    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {\n      this._bodyArrayBuffer = bufferClone(body);\n    } else {\n      this._bodyText = body = Object.prototype.toString.call(body);\n    }\n\n    if (!this.headers.get('content-type')) {\n      if (typeof body === 'string') {\n        this.headers.set('content-type', 'text/plain;charset=UTF-8');\n      } else if (this._bodyBlob && this._bodyBlob.type) {\n        this.headers.set('content-type', this._bodyBlob.type);\n      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');\n      }\n    }\n  };\n\n  if (support.blob) {\n    this.blob = function () {\n      var rejected = consumed(this);\n\n      if (rejected) {\n        return rejected;\n      }\n\n      if (this._bodyBlob) {\n        return Promise.resolve(this._bodyBlob);\n      } else if (this._bodyArrayBuffer) {\n        return Promise.resolve(new Blob([this._bodyArrayBuffer]));\n      } else if (this._bodyFormData) {\n        throw new Error('could not read FormData body as blob');\n      } else {\n        return Promise.resolve(new Blob([this._bodyText]));\n      }\n    };\n\n    this.arrayBuffer = function () {\n      if (this._bodyArrayBuffer) {\n        return consumed(this) || Promise.resolve(this._bodyArrayBuffer);\n      } else {\n        return this.blob().then(readBlobAsArrayBuffer);\n      }\n    };\n  }\n\n  this.text = function () {\n    var rejected = consumed(this);\n\n    if (rejected) {\n      return rejected;\n    }\n\n    if (this._bodyBlob) {\n      return readBlobAsText(this._bodyBlob);\n    } else if (this._bodyArrayBuffer) {\n      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));\n    } else if (this._bodyFormData) {\n      throw new Error('could not read FormData body as text');\n    } else {\n      return Promise.resolve(this._bodyText);\n    }\n  };\n\n  if (support.formData) {\n    this.formData = function () {\n      return this.text().then(decode);\n    };\n  }\n\n  this.json = function () {\n    return this.text().then(JSON.parse);\n  };\n\n  return this;\n} // HTTP methods whose capitalization should be normalized\n\n\nvar methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];\n\nfunction normalizeMethod(method) {\n  var upcased = method.toUpperCase();\n  return methods.indexOf(upcased) > -1 ? upcased : method;\n}\n\nfunction Request(input, options) {\n  options = options || {};\n  var body = options.body;\n\n  if (input instanceof Request) {\n    if (input.bodyUsed) {\n      throw new TypeError('Already read');\n    }\n\n    this.url = input.url;\n    this.credentials = input.credentials;\n\n    if (!options.headers) {\n      this.headers = new Headers(input.headers);\n    }\n\n    this.method = input.method;\n    this.mode = input.mode;\n    this.signal = input.signal;\n\n    if (!body && input._bodyInit != null) {\n      body = input._bodyInit;\n      input.bodyUsed = true;\n    }\n  } else {\n    this.url = String(input);\n  }\n\n  this.credentials = options.credentials || this.credentials || 'same-origin';\n\n  if (options.headers || !this.headers) {\n    this.headers = new Headers(options.headers);\n  }\n\n  this.method = normalizeMethod(options.method || this.method || 'GET');\n  this.mode = options.mode || this.mode || null;\n  this.signal = options.signal || this.signal;\n  this.referrer = null;\n\n  if ((this.method === 'GET' || this.method === 'HEAD') && body) {\n    throw new TypeError('Body not allowed for GET or HEAD requests');\n  }\n\n  this._initBody(body);\n}\n\nRequest.prototype.clone = function () {\n  return new Request(this, {\n    body: this._bodyInit\n  });\n};\n\nfunction decode(body) {\n  var form = new FormData();\n  body.trim().split('&').forEach(function (bytes) {\n    if (bytes) {\n      var split = bytes.split('=');\n      var name = split.shift().replace(/\\+/g, ' ');\n      var value = split.join('=').replace(/\\+/g, ' ');\n      form.append(decodeURIComponent(name), decodeURIComponent(value));\n    }\n  });\n  return form;\n}\n\nfunction parseHeaders(rawHeaders) {\n  var headers = new Headers(); // Replace instances of \\r\\n and \\n followed by at least one space or horizontal tab with a space\n  // https://tools.ietf.org/html/rfc7230#section-3.2\n\n  var preProcessedHeaders = rawHeaders.replace(/\\r?\\n[\\t ]+/g, ' ');\n  preProcessedHeaders.split(/\\r?\\n/).forEach(function (line) {\n    var parts = line.split(':');\n    var key = parts.shift().trim();\n\n    if (key) {\n      var value = parts.join(':').trim();\n      headers.append(key, value);\n    }\n  });\n  return headers;\n}\n\nBody.call(Request.prototype);\nfunction Response(bodyInit, options) {\n  if (!options) {\n    options = {};\n  }\n\n  this.type = 'default';\n  this.status = options.status === undefined ? 200 : options.status;\n  this.ok = this.status >= 200 && this.status < 300;\n  this.statusText = 'statusText' in options ? options.statusText : 'OK';\n  this.headers = new Headers(options.headers);\n  this.url = options.url || '';\n\n  this._initBody(bodyInit);\n}\nBody.call(Response.prototype);\n\nResponse.prototype.clone = function () {\n  return new Response(this._bodyInit, {\n    status: this.status,\n    statusText: this.statusText,\n    headers: new Headers(this.headers),\n    url: this.url\n  });\n};\n\nResponse.error = function () {\n  var response = new Response(null, {\n    status: 0,\n    statusText: ''\n  });\n  response.type = 'error';\n  return response;\n};\n\nvar redirectStatuses = [301, 302, 303, 307, 308];\n\nResponse.redirect = function (url, status) {\n  if (redirectStatuses.indexOf(status) === -1) {\n    throw new RangeError('Invalid status code');\n  }\n\n  return new Response(null, {\n    status: status,\n    headers: {\n      location: url\n    }\n  });\n};\n\nvar DOMException = self.DOMException;\n\ntry {\n  new DOMException();\n} catch (err) {\n  DOMException = function DOMException(message, name) {\n    this.message = message;\n    this.name = name;\n    var error = Error(message);\n    this.stack = error.stack;\n  };\n\n  DOMException.prototype = Object.create(Error.prototype);\n  DOMException.prototype.constructor = DOMException;\n}\n\nfunction fetch(input, init) {\n  return new Promise(function (resolve, reject) {\n    var request = new Request(input, init);\n\n    if (request.signal && request.signal.aborted) {\n      return reject(new DOMException('Aborted', 'AbortError'));\n    }\n\n    var xhr = new XMLHttpRequest();\n\n    function abortXhr() {\n      xhr.abort();\n    }\n\n    xhr.onload = function () {\n      var options = {\n        status: xhr.status,\n        statusText: xhr.statusText,\n        headers: parseHeaders(xhr.getAllResponseHeaders() || '')\n      };\n      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');\n      var body = 'response' in xhr ? xhr.response : xhr.responseText;\n      resolve(new Response(body, options));\n    };\n\n    xhr.onerror = function () {\n      reject(new TypeError('Network request failed'));\n    };\n\n    xhr.ontimeout = function () {\n      reject(new TypeError('Network request failed'));\n    };\n\n    xhr.onabort = function () {\n      reject(new DOMException('Aborted', 'AbortError'));\n    };\n\n    xhr.open(request.method, request.url, true);\n\n    if (request.credentials === 'include') {\n      xhr.withCredentials = true;\n    } else if (request.credentials === 'omit') {\n      xhr.withCredentials = false;\n    }\n\n    if ('responseType' in xhr && support.blob) {\n      xhr.responseType = 'blob';\n    }\n\n    request.headers.forEach(function (value, name) {\n      xhr.setRequestHeader(name, value);\n    });\n\n    if (request.signal) {\n      request.signal.addEventListener('abort', abortXhr);\n\n      xhr.onreadystatechange = function () {\n        // DONE (success or failure)\n        if (xhr.readyState === 4) {\n          request.signal.removeEventListener('abort', abortXhr);\n        }\n      };\n    }\n\n    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);\n  });\n}\nfetch.polyfill = true;\n\nif (!self.fetch) {\n  self.fetch = fetch;\n  self.Headers = Headers;\n  self.Request = Request;\n  self.Response = Response;\n}\n\n//# sourceURL=webpack:///./src/js/fetch-polyfill.js?");

/***/ })

/******/ });