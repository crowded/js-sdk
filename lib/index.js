function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Embed =
/*#__PURE__*/
function () {
  function Embed(iframe, config) {
    var _this = this;

    _classCallCheck(this, Embed);

    _defineProperty(this, "frame", void 0);

    _defineProperty(this, "ready", false);

    _defineProperty(this, "callbacks", {});

    _defineProperty(this, "state", {
      location: {
        pathname: ""
      }
    });

    _defineProperty(this, "pendingMethods", []);

    _defineProperty(this, "watchers", {
      transition: "WatchTransitions",
      scroll: "WatchScrollPosition"
    });

    _defineProperty(this, "CapturePostMessages", function () {
      window.addEventListener("message", function (e) {
        if (e.origin !== Crowded.config.domain) return;
        var message = e.data ? JSON.parse(e.data) : {};

        if (message.crowdedEvent && _this.callbacks[message.crowdedEvent]) {
          _this.callbacks[message.crowdedEvent].forEach(function (fun) {
            return fun(message.data);
          });
        }
      });
    });

    _defineProperty(this, "Call", function (m) {
      var _m = _slicedToArray(m, 2),
          method = _m[0],
          value = _m[1];

      if (_this.ready && _this.frame.contentWindow) _this.frame.contentWindow.postMessage(JSON.stringify({
        method: method,
        value: value
      }), Crowded.config.domain);else _this.pendingMethods.push(m);
    });

    if (!Crowded.config.domain) throw new Error("Missing Crowded configuration. Make sure set Crowded.config = { ... } before initializing an Embed");
    if (iframe.nodeName != "IFRAME") throw new TypeError("Parameter of new Crowded.Embed(...) must be Iframe DOM Element");
    this.frame = iframe; // this.on("transition", (state: any) => (this.state = state));

    this.Call(["Connect", config]);
    this.onTransition(function (state) {
      return _this.state = state;
    });
    this.on("initialized", function () {
      _this.ready = true;

      _this.pendingMethods.forEach(function (m) {
        return _this.Call(m);
      });
    });
    this.CapturePostMessages();
    this.to("");
  }

  _createClass(Embed, [{
    key: "to",

    /* public methods */
    value: function to(path) {
      if (path[0] != "/") path = "/" + path;
      if (path != this.state.location.pathname) this.state.name ? this.Call(["Navigate", path]) : this.frame.src = Crowded.config.domain + path;
    }
  }, {
    key: "configure",
    value: function configure(config) {
      this.Call(["Configure", config]);
    }
  }, {
    key: "on",
    value: function on(event, callback, options) {
      if (typeof callback != "function") throw new TypeError("Second parameter of Crowded.Embed.on() must be a function");
      /* if this is the first event handler for this type, 
         see if we need to add a watcher in the frontend */

      if (!this.callbacks[event]) {
        this.callbacks[event] = [];
        var watcher = Object.keys(this.watchers).includes(event) ? this.watchers[event] : false;
        if (watcher) this.Call([watcher, options]);
      }

      this.callbacks[event].push(callback);
    }
  }, {
    key: "onScroll",
    value: function onScroll(callback) {
      this.on('scroll', callback);
    }
  }, {
    key: "onTransition",
    value: function onTransition(callback) {
      this.on('transition', callback);
    }
  }]);

  return Embed;
}();

var Crowded =
/*#__PURE__*/
function () {
  function Crowded(c) {
    _classCallCheck(this, Crowded);

    Crowded.config = c;
  }

  _createClass(Crowded, null, [{
    key: "config",
    set: function set(c) {
      this._config = c;
    },
    get: function get() {
      return this._config;
    }
  }]);

  return Crowded;
}();

_defineProperty(Crowded, "_config", void 0);

_defineProperty(Crowded, "Embed", Embed);

export { Crowded as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFbWJlZCIsImlmcmFtZSIsImNvbmZpZyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJ0cmFuc2l0aW9uIiwic2Nyb2xsIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJvcmlnaW4iLCJDcm93ZGVkIiwiZG9tYWluIiwibWVzc2FnZSIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJjcm93ZGVkRXZlbnQiLCJjYWxsYmFja3MiLCJmb3JFYWNoIiwiZnVuIiwibSIsIm1ldGhvZCIsInZhbHVlIiwicmVhZHkiLCJmcmFtZSIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsInN0cmluZ2lmeSIsInBlbmRpbmdNZXRob2RzIiwicHVzaCIsIkVycm9yIiwibm9kZU5hbWUiLCJUeXBlRXJyb3IiLCJDYWxsIiwib25UcmFuc2l0aW9uIiwic3RhdGUiLCJvbiIsIkNhcHR1cmVQb3N0TWVzc2FnZXMiLCJ0byIsInBhdGgiLCJuYW1lIiwic3JjIiwiZXZlbnQiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJ3YXRjaGVyIiwiT2JqZWN0Iiwia2V5cyIsIndhdGNoZXJzIiwiaW5jbHVkZXMiLCJjIiwiX2NvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQTBCTUEsSzs7O0FBaUJGLGlCQUFZQyxNQUFaLEVBQXVDQyxNQUF2QyxFQUE2RDtBQUFBOztBQUFBOztBQUFBOztBQUFBLG1DQWZyRCxLQWVxRDs7QUFBQSx1Q0FkekIsRUFjeUI7O0FBQUEsbUNBWjlDO0FBQ1hDLE1BQUFBLFFBQVEsRUFBRTtBQUNOQyxRQUFBQSxRQUFRLEVBQUU7QUFESjtBQURDLEtBWThDOztBQUFBLDRDQU5sQyxFQU1rQzs7QUFBQSxzQ0FMOUI7QUFDM0JDLE1BQUFBLFVBQVUsRUFBRSxrQkFEZTtBQUUzQkMsTUFBQUEsTUFBTSxFQUFFO0FBRm1CLEtBSzhCOztBQUFBLGlEQTRCL0IsWUFBTTtBQUNoQ0MsTUFBQUEsTUFB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VjtBQUNIOzs7dUJBRUV5QyxLLEVBQWVDLFEsRUFBb0JDLE8sRUFBZTtBQUNqRCxVQUFJLE9BQU9ELFFBQVAsSUFBbUIsVUFBdkIsRUFDSSxNQUFNLElBQUlYLFNBQUosQ0FDRiwyREFERSxDQUFOO0FBSUo7OztBQUVBLFVBQUksQ0FBQyxLQUFLZixTQUFMLENBQWV5QixLQUFmLENBQUwsRUFBNEI7QUFDeEIsYUFBS3pCLFNBQUwsQ0FBZXlCLEtBQWYsSUFBd0IsRUFBeEI7QUFDQSxZQUFJRyxPQUFPLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUtDLFFBQWpCLEVBQTJCQyxRQUEzQixDQUFvQ1AsS0FBcEMsSUFBNkMsS0FBS00sUUFBTCxDQUFjTixLQUFkLENBQTdDLEdBQW9FLEtBQWxGO0FBQ0EsWUFBSUcsT0FBSixFQUFhLEtBQUtaLElBQUwsQ0FBVSxDQUFDWSxPQUFELEVBQVVELE9BQVYsQ0FBVjtBQUNoQjs7QUFFRCxXQUFLM0IsU0FBTCxDQUFleUIsS0FBZixFQUFzQmIsSUFBdEIsQ0FBMkJjLFFBQTNCO0FBQ0g7Ozs2QkFFUUEsUSxFQUE0QjtBQUNqQyxXQUFLUCxFQUFMLENBQVEsUUFBUixFQUFrQk8sUUFBbEI7QUFDSDs7O2lDQUVZQSxRLEVBQWdDO0FBQ3pDLFdBQUtQLEVBQUwsQ0FBUSxZQUFSLEVBQXNCTyxRQUF0QjtBQUNIOzs7Ozs7SUFPZ0JqQyxPOzs7QUFJakIsbUJBQVl3QyxDQUFaLEVBQXVCO0FBQUE7O0FBQ25CeEMsSUFBQUEsT0FBTyxDQUFDVCxNQUFSLEdBQWlCaUQsQ0FBakI7QUFDSDs7OztzQkFFaUJBLEMsRUFBVztBQUN6QixXQUFLQyxPQUFMLEdBQWVELENBQWY7QUFDSCxLO3dCQUNtQjtBQUFFLGFBQU8sS0FBS0MsT0FBWjtBQUFxQjs7Ozs7O2dCQVgxQnpDLE87O2dCQUFBQSxPLFdBRUZYLEs7O1NBRkVXLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgRGljdGlvbmFyeTxUPiB7XG4gICAgW2tleTogc3RyaW5nXTogVDtcbn1cblxudHlwZSBTdGF0ZSA9IHtcbiAgICBsb2NhdGlvbjoge1xuICAgICAgICBwYXRobmFtZTogc3RyaW5nXG4gICAgfTtcbiAgICBuYW1lPzogc3RyaW5nXG4gICAgZnJvbVBhcmVudD86IGJvb2xlYW5cbn1cblxudHlwZSBvblNjcm9sbENhbGxiYWNrID0ge1xuICAgIChzY29sbDogeyB0b3A6IGJvb2xlYW4sIGJvdHRvbTogYm9vbGVhbiwgeTogbnVtYmVyIH0pOiB2b2lkXG59XG5cbnR5cGUgb25UcmFuc2l0aW9uQ2FsbGJhY2sgPSB7XG4gICAgKHN0YXRlOiBTdGF0ZSk6IHZvaWRcbn1cblxudHlwZSBlbWJlZENvbmZpZyA9IHtcbiAgICBmb290ZXJTcGFjaW5nPzogbnVtYmVyLFxuICAgIGRlYnVnPzogYm9vbGVhblxufVxuXG50eXBlIG1ldGhvZCA9IFtzdHJpbmcsIGFueT9dXG5jbGFzcyBFbWJlZCB7XG4gICAgZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50XG4gICAgcmVhZHkgPSBmYWxzZVxuICAgIGNhbGxiYWNrczogRGljdGlvbmFyeTxGdW5jdGlvbltdPiA9IHt9XG5cbiAgICBzdGF0ZTogU3RhdGUgPSB7XG4gICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICBwYXRobmFtZTogXCJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGVuZGluZ01ldGhvZHM6IG1ldGhvZFtdID0gW11cbiAgICB3YXRjaGVyczogRGljdGlvbmFyeTxzdHJpbmc+ID0ge1xuICAgICAgICB0cmFuc2l0aW9uOiBcIldhdGNoVHJhbnNpdGlvbnNcIixcbiAgICAgICAgc2Nyb2xsOiBcIldhdGNoU2Nyb2xsUG9zaXRpb25cIlxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGNvbmZpZz86IGVtYmVkQ29uZmlnKSB7XG4gICAgICAgIGlmICghQ3Jvd2RlZC5jb25maWcuZG9tYWluKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIFwiTWlzc2luZyBDcm93ZGVkIGNvbmZpZ3VyYXRpb24uIE1ha2Ugc3VyZSBzZXQgQ3Jvd2RlZC5jb25maWcgPSB7IC4uLiB9IGJlZm9yZSBpbml0aWFsaXppbmcgYW4gRW1iZWRcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICBpZiAoaWZyYW1lLm5vZGVOYW1lICE9IFwiSUZSQU1FXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgIFwiUGFyYW1ldGVyIG9mIG5ldyBDcm93ZGVkLkVtYmVkKC4uLikgbXVzdCBiZSBJZnJhbWUgRE9NIEVsZW1lbnRcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mcmFtZSA9IGlmcmFtZTtcblxuICAgICAgICAvLyB0aGlzLm9uKFwidHJhbnNpdGlvblwiLCAoc3RhdGU6IGFueSkgPT4gKHRoaXMuc3RhdGUgPSBzdGF0ZSkpO1xuXG4gICAgICAgIHRoaXMuQ2FsbChbXCJDb25uZWN0XCIsIGNvbmZpZ10pXG5cbiAgICAgICAgdGhpcy5vblRyYW5zaXRpb24oKHN0YXRlKSA9PiAodGhpcy5zdGF0ZSA9IHN0YXRlKSlcblxuICAgICAgICB0aGlzLm9uKFwiaW5pdGlhbGl6ZWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ01ldGhvZHMuZm9yRWFjaChtID0+IHRoaXMuQ2FsbChtKSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5DYXB0dXJlUG9zdE1lc3NhZ2VzKCk7XG5cbiAgICAgICAgdGhpcy50byhcIlwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIENhcHR1cmVQb3N0TWVzc2FnZXMgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbiAhPT0gQ3Jvd2RlZC5jb25maWcuZG9tYWluKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGUuZGF0YSA/IEpTT04ucGFyc2UoZS5kYXRhKSA6IHt9O1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY3Jvd2RlZEV2ZW50ICYmIHRoaXMuY2FsbGJhY2tzW21lc3NhZ2UuY3Jvd2RlZEV2ZW50XSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW21lc3NhZ2UuY3Jvd2RlZEV2ZW50XS5mb3JFYWNoKGZ1biA9PlxuICAgICAgICAgICAgICAgICAgICBmdW4obWVzc2FnZS5kYXRhKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcml2YXRlIENhbGwgPSAobTogbWV0aG9kKSA9PiB7XG4gICAgICAgIGxldCBbbWV0aG9kLCB2YWx1ZV0gPSBtO1xuXG4gICAgICAgIGlmICh0aGlzLnJlYWR5ICYmIHRoaXMuZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgIHRoaXMuZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IG1ldGhvZCwgdmFsdWUgfSksXG4gICAgICAgICAgICAgICAgQ3Jvd2RlZC5jb25maWcuZG9tYWluXG4gICAgICAgICAgICApO1xuICAgICAgICBlbHNlIHRoaXMucGVuZGluZ01ldGhvZHMucHVzaChtKVxuICAgIH07XG5cbiAgICAvKiBwdWJsaWMgbWV0aG9kcyAqL1xuICAgIHRvKHBhdGg6IHN0cmluZykge1xuICAgICAgICBpZiAocGF0aFswXSAhPSBcIi9cIikgcGF0aCA9IFwiL1wiICsgcGF0aDtcbiAgICAgICAgaWYgKHBhdGggIT0gdGhpcy5zdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUubmFtZVxuICAgICAgICAgICAgICAgID8gdGhpcy5DYWxsKFtcIk5hdmlnYXRlXCIsIHBhdGhdKVxuICAgICAgICAgICAgICAgIDogKHRoaXMuZnJhbWUuc3JjID1cbiAgICAgICAgICAgICAgICAgICAgQ3Jvd2RlZC5jb25maWcuZG9tYWluICsgcGF0aCk7XG4gICAgfVxuXG4gICAgY29uZmlndXJlKGNvbmZpZzogZW1iZWRDb25maWcpIHtcbiAgICAgICAgdGhpcy5DYWxsKFtcIkNvbmZpZ3VyZVwiLCBjb25maWddKVxuICAgIH1cblxuICAgIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJTZWNvbmQgcGFyYW1ldGVyIG9mIENyb3dkZWQuRW1iZWQub24oKSBtdXN0IGJlIGEgZnVuY3Rpb25cIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvKiBpZiB0aGlzIGlzIHRoZSBmaXJzdCBldmVudCBoYW5kbGVyIGZvciB0aGlzIHR5cGUsIFxuICAgICAgICAgICBzZWUgaWYgd2UgbmVlZCB0byBhZGQgYSB3YXRjaGVyIGluIHRoZSBmcm9udGVuZCAqL1xuICAgICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW2V2ZW50XSkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbZXZlbnRdID0gW11cbiAgICAgICAgICAgIGxldCB3YXRjaGVyID0gT2JqZWN0LmtleXModGhpcy53YXRjaGVycykuaW5jbHVkZXMoZXZlbnQpID8gdGhpcy53YXRjaGVyc1tldmVudF0gOiBmYWxzZVxuICAgICAgICAgICAgaWYgKHdhdGNoZXIpIHRoaXMuQ2FsbChbd2F0Y2hlciwgb3B0aW9uc10pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrc1tldmVudF0ucHVzaChjYWxsYmFjaylcbiAgICB9XG5cbiAgICBvblNjcm9sbChjYWxsYmFjazogb25TY3JvbGxDYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9uKCdzY3JvbGwnLCBjYWxsYmFjaylcbiAgICB9XG5cbiAgICBvblRyYW5zaXRpb24oY2FsbGJhY2s6IG9uVHJhbnNpdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub24oJ3RyYW5zaXRpb24nLCBjYWxsYmFjaylcbiAgICB9XG59XG5cbmludGVyZmFjZSBDb25maWcge1xuICAgIGRvbWFpbjogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm93ZGVkIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfY29uZmlnOiBDb25maWc7XG4gICAgc3RhdGljIEVtYmVkID0gRW1iZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihjOiBDb25maWcpIHtcbiAgICAgICAgQ3Jvd2RlZC5jb25maWcgPSBjXG4gICAgfVxuXG4gICAgc3RhdGljIHNldCBjb25maWcoYzogQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb25maWcoKSB7IHJldHVybiB0aGlzLl9jb25maWcgfVxufSJdfQ==