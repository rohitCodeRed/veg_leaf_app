# Veg Leaf App
It's a Ionic web app and android app which identify vegetables leaf by capturing image. And also predict the MSP of Wheat from past 25 years data.


# Prerequistes
* npm
* npm install -g @ionic/cli


Steps for Running App
## Web App
* git clone https://github.com/rohitCodeRed/veg_leaf_app
* cd veg_leaf_app
* npm install

## For Browser App
* ionic serve  #-> Ionic web app is running will run at localhost:8100

## For Android App
### First change the environment variables in file: src/environments/environment.ts
serverUrl: "http://< IP assign by Router/modem >:4000"

* ionic build
* ionic capacitor add android
* ionic capacitor copy android  #-> to sync up code..
* npx cap open android  #-> Open android project in Android studio..


### For mere detail, please visit my medium page: https://medium.com/@alwaysHopeGood/veg-leaf-ai-53d657c257bb


