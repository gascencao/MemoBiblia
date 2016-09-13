/*
 * Para generar una key de android:
 * keytool -genkey -v -keystore %HOMEPATH%\.android\debug.keystore -alias memobiblia_debug -keyalg RSA -keysize 2048 -validity 10000
 * keytool -genkey -v -keystore %HOMEPATH%\.android\debug.keystore -alias memobiblia -keyalg RSA -keysize 2048 -validity 10000
 * Va a solicitar una contraseña que está en el KeePass en el item Android KeyStore
 * 
 * Luego, se puede cargar la key en el sitio de phonegap de Adobe
 * https://build.phonegap.com/apps/2097761/builds
 * Va a solicitar una contraseña que está en el KeePass en el item Adobe Id
 * 
 * Por último, se puede exportar el hash para poner en facebook usando los comandos
 * keytool -exportcert -alias memobiblia_debug -keystore %HOMEPATH%\.android\debug.keystore | "c:\Users\gascencao\.android\Open SSL\bin\openssl" sha1 -binary | "c:\Users\gascencao\.android\Open SSL\bin\openssl" base64
 * keytool -exportcert -alias memobiblia -keystore %HOMEPATH%\.android\debug.keystore | "c:\Users\gascencao\.android\Open SSL\bin\openssl" sha1 -binary | "c:\Users\gascencao\.android\Open SSL\bin\openssl" base64
 * Se guardan en la configuración de la App de Facebook, en la sección de la plataforma de Android en el input de hashes
 * https://developers.facebook.com/apps/1565427663764053/settings/
 */
var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        //controller.init();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      //controller.main();
    },

    isBrowser: function() {
      return window.cordova.platformId === "browser";
    }
};
