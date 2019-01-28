(function() {
    // properties
 
    const androidManifest = require("../android/updateAndroidManifest.js");
  
    // entry
    module.exports = run;
  
    // builds after platform config
    function run(context) {
      const preferences = configPreferences.read(context);
      const platforms = context.opts.cordova.platforms;
  
      platforms.forEach(platform => {
        if (platform === 'android') {
          androidManifest.writePreferences(context, preferences);
        }
      });
    }
  })();