TMX2HTML
========

Render TMX maps in the Browser

### Initialise
```javascript
var Map = new tmx2Html();
```

### Load/Save a map
```javascript
// MapName sets or gets the map name.
// MapFile is optional, but is required to set the map name.
Map.load('MapName', 'MapFile');
```

### Render a map
```javascript
// Returns a completed map element.
Map.render('MapName');
```
