exports['test parsing show listing'] = function(assert, done) {
  var cjsw = require('.');
  
  const showUrl = 'http://cjsw.com/program/thats-classical/episode/20170618';
  
  cjsw.get_tracks(showUrl, function(err, tracks) {
    assert.equal(err, null, "Should not have received an error.");
    
    assert.notStrictEqual(tracks, undefined, "Tracks should be valid.");
    assert.equal(Array.isArray(tracks), true, "Expected tracks to be an array.");
    
    assert.notStrictEqual(tracks.length, 0, "Tracks collection shouldn't be empty.");
    
    for(var i = 0; i < tracks.length; ++i) {
      // Check first for undefined, our awful nemesis
      assert.notStrictEqual(tracks[i], undefined, `Track ${i} should be defined.`)
      
      // Check each field for existence
      assert.notStrictEqual(tracks[i].artist, undefined, "Artist must exist on this track")
      assert.notStrictEqual(tracks[i].title, undefined, "Title must exist on this track")
      assert.notStrictEqual(tracks[i].album, undefined, "Album must exist on this track")
    }
    
    done()
  })
}

if (module == require.main) require('test').run(exports)