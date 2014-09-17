var tmx2html;

tmx2html = (function() {
  function tmx2html() {
    $('head').append('<style id="tmx2html"></style>');
  }

  tmx2html.prototype.store = {};

  tmx2html.prototype.tilesetStore = {};

  tmx2html.prototype.load = function(name, file, callback) {
    var map, that;
    if (file == null) {
      file = false;
    }
    if (callback == null) {
      callback = false;
    }
    that = this;
    if (file) {
      $.getJSON(file, function(json) {
        var tileset, _i, _len, _ref;
        that.store[name] = json;
        _ref = json.tilesets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tileset = _ref[_i];
          that.tilesetStore[name] = that.addTileset(tileset.name, tileset.image);
        }
        return callback(json, name);
      });
      return true;
    } else {
      if (map = this.store[name]) {
        return map;
      }
    }
  };

  tmx2html.prototype.getTileSet = function(name, tileId) {
    var index, set, setIndex, sets, _i, _len;
    sets = this.store[name].tilesets;
    setIndex = 0;
    for (index = _i = 0, _len = sets.length; _i < _len; index = ++_i) {
      set = sets[index];
      if (tileId >= set.firstgid) {
        setIndex = index;
      }
    }
    return sets[setIndex];
  };

  tmx2html.prototype.render = function(name) {
    var className, classNames, html, index, json, layer, layerWidth, loc, newX, newY, tile, tileset, _i, _j, _len, _len1, _ref, _ref1;
    json = this.store[name];
    classNames = html = "";
    layerWidth = json.layers[0].width * 32;
    _ref = json.layers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      layer = _ref[_i];
      html += "<div class='layer layer-" + layer.name + "' style='width: " + layerWidth + "px;'>";
      if (layer.data != null) {
        _ref1 = layer.data;
        for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
          tile = _ref1[index];
          tileset = this.getTileSet(name, tile);
          if (loc = this.tileNumberToLoc(tile, tileset)) {
            className = "tileset-" + tileset.name;
            newX = loc.x * 32;
            newY = loc.y * 32;
            html += "<div class='tile " + layer.name + " tile-" + index + " " + className + "' style='background-position: -" + newX + "px -" + newY + "px;'></div>";
          } else {
            html += "<div class='tile " + layer.name + " tile-" + index + "'></div>";
          }
        }
      }
      html += "</div>";
    }
    return $(html);
  };

  tmx2html.prototype.addTileset = function(name, image) {
    var className;
    className = "tileset-" + name;
    $('#tmx2html').append("." + className + "{ background-image: url('" + image + "'); }");
    return className;
  };

  tmx2html.prototype.tileNumberToLoc = function(number, tileset) {
    var i, imageWidth, x, y, _i;
    number = number - tileset.firstgid + 1;
    if (number > 0) {
      x = y = 0;
      imageWidth = tileset.imagewidth / 32 - 1;
      for (i = _i = 1; 1 <= number ? _i < number : _i > number; i = 1 <= number ? ++_i : --_i) {
        ++x;
        if (x > imageWidth) {
          ++y;
          x = 0;
        }
      }
      return {
        x: x,
        y: y
      };
    } else {
      return false;
    }
  };

  return tmx2html;

})();
