function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Embed =
/*#__PURE__*/
function () {
  function Embed(iframe) {
    var _this = this;

    _classCallCheck(this, Embed);

    _defineProperty(this, "frame", void 0);

    _defineProperty(this, "callbacks", {});

    _defineProperty(this, "state", {
      location: {
        pathname: ""
      }
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

    _defineProperty(this, "Call", function (method, value) {
      if (_this.frame.contentWindow) _this.frame.contentWindow.postMessage(JSON.stringify({
        method: method,
        value: value
      }), Crowded.config.domain);
    });

    if (!Crowded.config.domain) throw new Error("Missing Crowded configuration. Make sure set Crowded.config = { ... } before initializing an Embed");
    if (iframe.nodeName != "IFRAME") throw new TypeError("Parameter of new Crowded.Embed(...) must be Iframe DOM Element");
    this.frame = iframe;

    this.frame.onload = function () {
      return _this.Call("Connect");
    };

    this.on("transition", function (state) {
      return _this.state = state;
    });
    this.CapturePostMessages();
    this.to("");
  }
  /* public methods */


  _createClass(Embed, [{
    key: "to",
    value: function to(path) {
      if (path[0] != "/") path = "/" + path;
      if (path != this.state.location.pathname) this.state.state ? this.Call("Navigate", path) : this.frame.src = Crowded.config.domain + path + "?iframe=true";
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      if (typeof callback != "function") throw new TypeError("Second parameter of Crowded.Embed.on() must be a function");
      this.callbacks[event] ? this.callbacks[event].push(callback) : this.callbacks[event] = [callback];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFbWJlZCIsImlmcmFtZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9yaWdpbiIsIkNyb3dkZWQiLCJjb25maWciLCJkb21haW4iLCJtZXNzYWdlIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImNyb3dkZWRFdmVudCIsImNhbGxiYWNrcyIsImZvckVhY2giLCJmdW4iLCJtZXRob2QiLCJ2YWx1ZSIsImZyYW1lIiwiY29udGVudFdpbmRvdyIsInBvc3RNZXNzYWdlIiwic3RyaW5naWZ5IiwiRXJyb3IiLCJub2RlTmFtZSIsIlR5cGVFcnJvciIsIm9ubG9hZCIsIkNhbGwiLCJvbiIsInN0YXRlIiwiQ2FwdHVyZVBvc3RNZXNzYWdlcyIsInRvIiwicGF0aCIsInNyYyIsImV2ZW50IiwiY2FsbGJhY2siLCJwdXNoIiwiYyIsIl9jb25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BLEs7OztBQWdCRixpQkFBWUMsTUFBWixFQUF1QztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQVpuQyxFQVltQzs7QUFBQSxtQ0FObkM7QUFDSUMsTUFBQUEsUUFBUSxFQUFFO0FBQ05DLFFBQUFBLFFBQVEsRUFBRTtBQURKO0FBRGQsS0FNbUM7O0FBQUEsaURBeUNqQixZQUFNO0FBQ3hCQyxNQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLFVBQUFDLENBQUMsRUFBSTtBQUNwQyxZQUFJQSxDQUFDLENBQUNDLE1BQUYsS0FBYUMsT0FBTyxDQUFDQyxNQUFSLENBQWVDLE1BQWhDLEVBQXdDO0FBQ3hDLFlBQUlDLE9BQU8sR0FBR0wsQ0FBQyxDQUFDTSxJQUFGLEdBQVNDLElBQUksQ0FBQ0MsS0FBTCxDQUFXUixDQUFDLENBQUNNLElBQWIsQ0FBVCxHQUE4QixFQUE1Qzs7QUFDQSxZQUFJRCxPQUFPLENBQUNJLFlBQVIsSUFBd0IsS0FBSSxDQUFDQyxTQUFMLENBQWVMLE9BQU8sQ0FBQ0ksWUFBdkIsQ0FBNUIsRUFBa0U7QUFDOUQsVUFBQSxLQUFJLENBQUNDLFNBQUwsQ0FBZUwsT0FBTyxDQUFDSSxZQUF2QixFQUFxQ0UsT0FBckMsQ0FBNkMsVUFBQUMsR0FBRztBQUFBLG1CQUM1Q0EsR0FBRyxDQUFDUCxPQUFPLENBQUNDLElBQVQsQ0FEeUM7QUFBQSxXQUFoRDtBQUdIO0FBQ0osT0FSRDtBQVNILEtBbkRzQzs7QUFBQSxrQ0FxRGhDLFVBQUNPLE1BQUQsRUFBaUJDLEtBQWpCLEVBQWlDO0FBQ3BDLFVBQUksS0FBSSxDQUFDQyxLQUFMLENBQVdDLGFBQWYsRUFDSSxLQUFJLENBQUNELEtBQUwsQ0FBV0MsYUFBWCxDQUF5QkMsV0FBekIsQ0FDSVYsSUFBSSxDQUFDVyxTQUFMLENBQWU7QUFBRUwsUUFBQUEsTUFBTSxFQUFFQSxNQUFWO0FBQWtCQyxRQUFBQSxLQUFLLEVBQUxBO0FBQWxCLE9BQWYsQ0FESixFQUVJWixPQUFPLENBQUNDLE1BQVIsQ0FBZUMsTUFGbkI7QUFJUCxLQTNEc0M7O0FBQ25DLFFBQUksQ0FBQ0YsT0FBTyxDQUFDQyxNQUFSLENBQWVDLE1BQXBCLEVBQ0ksTUFBTSxJQUFJZSxLQUFKLENBQ0Ysb0dBREUsQ0FBTjtBQUlKLFFBQUl4QixNQUFNLENBQUN5QixRQUFQLElBQW1CLFFBQXZCLEVBQ0ksTUFBTSxJQUFJQyxTQUFKLENBQ0YsZ0VBREUsQ0FBTjtBQUlKLFNBQUtOLEtBQUwsR0FBYXBCLE1BQWI7O0FBRUEsU0FBS29CLEtBQUwsQ0FBV08sTUFBWCxHQUFvQjtBQUFBLGFBQU0sS0FBSSxDQUFDQyxJQUFMLENBQVUsU0FBVixDQUFOO0FBQUEsS0FBcEI7O0FBRUEsU0FBS0MsRUFBTCxDQUFRLFlBQVIsRUFBc0IsVUFBQ0MsS0FBRDtBQUFBLGFBQWlCLEtBQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUE5QjtBQUFBLEtBQXRCO0FBQ0EsU0FBS0MsbUJBQUw7QUFFQSxTQUFLQyxFQUFMLENBQVEsRUFBUjtBQUNIO0FBRUQ7Ozs7O3VCQUNHQyxJLEVBQWM7QUFDYixVQUFJQSxJQUFJLENBQUMsQ0FBRCxDQUFKLElBQVcsR0FBZixFQUFvQkEsSUFBSSxHQUFHLE1BQU1BLElBQWI7QUFDcEIsVUFBSUEsSUFBSSxJQUFJLEtBQUtILEtBQUwsQ0FBVzdCLFFBQVgsQ0FBb0JDLFFBQWhDLEVBQ0ksS0FBSzRCLEtBQUwsQ0FBV0EsS0FBWCxHQUNNLEtBQUtGLElBQUwsQ0FBVSxVQUFWLEVBQXNCSyxJQUF0QixDQUROLEdBRU8sS0FBS2IsS0FBTCxDQUFXYyxHQUFYLEdBQ0MzQixPQUFPLENBQUNDLE1BQVIsQ0FBZUMsTUFBZixHQUF3QndCLElBQXhCLEdBQStCLGNBSHZDO0FBSVA7Ozt1QkFFRUUsSyxFQUFlQyxRLEVBQW9CO0FBQ2xDLFVBQUksT0FBT0EsUUFBUCxJQUFtQixVQUF2QixFQUNJLE1BQU0sSUFBSVYsU0FBSixDQUNGLDJEQURFLENBQU47QUFHSixXQUFLWCxTQUFMLENBQWVvQixLQUFmLElBQ00sS0FBS3BCLFNBQUwsQ0FBZW9CLEtBQWYsRUFBc0JFLElBQXRCLENBQTJCRCxRQUEzQixDQUROLEdBRU8sS0FBS3JCLFNBQUwsQ0FBZW9CLEtBQWYsSUFBd0IsQ0FBQ0MsUUFBRCxDQUYvQjtBQUdIOzs7Ozs7SUEyQmdCN0IsTzs7O0FBSWpCLG1CQUFZK0IsQ0FBWixFQUF1QjtBQUFBOztBQUNuQi9CLElBQUFBLE9BQU8sQ0FBQ0MsTUFBUixHQUFpQjhCLENBQWpCO0FBQ0g7Ozs7c0JBRWlCQSxDLEVBQVc7QUFDekIsV0FBS0MsT0FBTCxHQUFlRCxDQUFmO0FBQ0gsSzt3QkFDbUI7QUFBRSxhQUFPLEtBQUtDLE9BQVo7QUFBcUI7Ozs7OztnQkFYMUJoQyxPOztnQkFBQUEsTyxXQUVGUixLOztTQUZFUSxPIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRW1iZWQge1xuICAgIGZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiBGdW5jdGlvbltdO1xuICAgIH0gPSB7fTtcbiAgICBzdGF0ZToge1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgcGF0aG5hbWU6IHN0cmluZztcbiAgICAgICAgfTtcbiAgICAgICAgc3RhdGU/OiBzdHJpbmc7XG4gICAgfSA9IHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWU6IFwiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFDcm93ZGVkLmNvbmZpZy5kb21haW4pXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJNaXNzaW5nIENyb3dkZWQgY29uZmlndXJhdGlvbi4gTWFrZSBzdXJlIHNldCBDcm93ZGVkLmNvbmZpZyA9IHsgLi4uIH0gYmVmb3JlIGluaXRpYWxpemluZyBhbiBFbWJlZFwiXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIGlmIChpZnJhbWUubm9kZU5hbWUgIT0gXCJJRlJBTUVcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJQYXJhbWV0ZXIgb2YgbmV3IENyb3dkZWQuRW1iZWQoLi4uKSBtdXN0IGJlIElmcmFtZSBET00gRWxlbWVudFwiXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZnJhbWUgPSBpZnJhbWU7XG5cbiAgICAgICAgdGhpcy5mcmFtZS5vbmxvYWQgPSAoKSA9PiB0aGlzLkNhbGwoXCJDb25uZWN0XCIpO1xuXG4gICAgICAgIHRoaXMub24oXCJ0cmFuc2l0aW9uXCIsIChzdGF0ZTogYW55KSA9PiAodGhpcy5zdGF0ZSA9IHN0YXRlKSk7XG4gICAgICAgIHRoaXMuQ2FwdHVyZVBvc3RNZXNzYWdlcygpO1xuXG4gICAgICAgIHRoaXMudG8oXCJcIik7XG4gICAgfVxuXG4gICAgLyogcHVibGljIG1ldGhvZHMgKi9cbiAgICB0byhwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHBhdGhbMF0gIT0gXCIvXCIpIHBhdGggPSBcIi9cIiArIHBhdGg7XG4gICAgICAgIGlmIChwYXRoICE9IHRoaXMuc3RhdGUubG9jYXRpb24ucGF0aG5hbWUpXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXRlXG4gICAgICAgICAgICAgICAgPyB0aGlzLkNhbGwoXCJOYXZpZ2F0ZVwiLCBwYXRoKVxuICAgICAgICAgICAgICAgIDogKHRoaXMuZnJhbWUuc3JjID1cbiAgICAgICAgICAgICAgICAgICAgQ3Jvd2RlZC5jb25maWcuZG9tYWluICsgcGF0aCArIFwiP2lmcmFtZT10cnVlXCIpO1xuICAgIH1cblxuICAgIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJTZWNvbmQgcGFyYW1ldGVyIG9mIENyb3dkZWQuRW1iZWQub24oKSBtdXN0IGJlIGEgZnVuY3Rpb25cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbZXZlbnRdXG4gICAgICAgICAgICA/IHRoaXMuY2FsbGJhY2tzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICAgICAgOiAodGhpcy5jYWxsYmFja3NbZXZlbnRdID0gW2NhbGxiYWNrXSk7XG4gICAgfVxuXG4gICAgQ2FwdHVyZVBvc3RNZXNzYWdlcyA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luICE9PSBDcm93ZGVkLmNvbmZpZy5kb21haW4pIHJldHVybjtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZS5kYXRhID8gSlNPTi5wYXJzZShlLmRhdGEpIDoge307XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5jcm93ZGVkRXZlbnQgJiYgdGhpcy5jYWxsYmFja3NbbWVzc2FnZS5jcm93ZGVkRXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbbWVzc2FnZS5jcm93ZGVkRXZlbnRdLmZvckVhY2goZnVuID0+XG4gICAgICAgICAgICAgICAgICAgIGZ1bihtZXNzYWdlLmRhdGEpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIENhbGwgPSAobWV0aG9kOiBzdHJpbmcsIHZhbHVlPzogYW55KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZyYW1lLmNvbnRlbnRXaW5kb3cpXG4gICAgICAgICAgICB0aGlzLmZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyBtZXRob2Q6IG1ldGhvZCwgdmFsdWUgfSksXG4gICAgICAgICAgICAgICAgQ3Jvd2RlZC5jb25maWcuZG9tYWluXG4gICAgICAgICAgICApO1xuICAgIH07XG59XG5cbmludGVyZmFjZSBDb25maWcge1xuICAgIGRvbWFpbjogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm93ZGVkIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfY29uZmlnOiBDb25maWc7XG4gICAgc3RhdGljIEVtYmVkID0gRW1iZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihjOiBDb25maWcpIHtcbiAgICAgICAgQ3Jvd2RlZC5jb25maWcgPSBjXG4gICAgfVxuXG4gICAgc3RhdGljIHNldCBjb25maWcoYzogQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb25maWcoKSB7IHJldHVybiB0aGlzLl9jb25maWcgfVxufSJdfQ==