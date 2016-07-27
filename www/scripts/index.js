// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    var oBrowser = null;

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function log(text)
    {
        console.log("***" + text + "\n");
    }

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        log("man" + device.manufacturer);
        log("uuid" + device.uuid);
        log("serial" + device.serial);

        boom();

        //oBrowser = cordova.InAppBrowser.open('http://365word.ru', '_parent', 'location=no')
        oBrowser = cordova.InAppBrowser.open('http://365word.ru', '_parent', 'location=yes')
        
        oBrowser.addEventListener('loadstart', onUrlLoadStarted);
        oBrowser.addEventListener('loadstop', onUrlLoaded);
        oBrowser.addEventListener('exit', onBrowserExit);
    };

    function bringToFront()
    {

    }

    function boom()
    {
        /*
        navigator.notification.alert(
            'You are the winner!',  // message
            onBrowserExit,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
        */
        var today = new Date();
        today.setMinutes(today.getMinutes() + 1);
        cordova.plugins.notification.local.schedule({
            id: 1,
            text: 'My first notification',
            every: 'day',
            firstAt: today,
        });
        cordova.plugins.notification.local.on('click', function (notification) {
            onBrowserExit();
        }, this);
    }

    function onBrowserExit()
    {
        navigator.app.exitApp();
    }

    function onUrlLoaded(params)
    {
        log("onUrlLoaded:" + params.url);
    }

    function onUrlLoadStarted(event)
    {
        log("onUrlLoadStarted:" + event.url);
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
        boom();
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        boom();
    };
} )();