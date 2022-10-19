const config = {
  expo: {
    "name": "Matcha",
    "slug": "matching-client",
    "version": "1.0.0",
    "extra": {
      "apiUrl": process.env.API_URL,
      "socketUrl": process.env.SOCKET_URL,
      "eas": {
        "projectId": "6490c655-3f4c-4660-8e88-f095dd399045"
      }
    },
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "com.macha.matcha",
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
      "supportsTablet": true,
      "bundleIdentifier": "com.macha.matcha",
      "infoPlist": {
        "UIBackgroundModes": [
          "audio"
        ]
      }
    },
    "android": {
      "package": "com.macha.matcha",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff", 
      },
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    }
  }
};

module.exports = config;