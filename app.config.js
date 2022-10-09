const config = {
  expo: {
    "name": "matching-client",
    "slug": "matching-client",
    "version": "1.0.0",
    "extra": {
      "apiUrl": process.env.API_URL,
      "eas": {
        "projectId": "6490c655-3f4c-4660-8e88-f095dd399045"
      }
    },
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    }
  }
};

module.exports = config;