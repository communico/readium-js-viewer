//  Copyright (c) 2014 Readium Foundation and/or its licensees. All rights reserved.
//  
//  Redistribution and use in source and binary forms, with or without modification, 
//  are permitted provided that the following conditions are met:
//  1. Redistributions of source code must retain the above copyright notice, this 
//  list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice, 
//  this list of conditions and the following disclaimer in the documentation and/or 
//  other materials provided with the distribution.
//  3. Neither the name of the organization nor the names of its contributors may be 
//  used to endorse or promote products derived from this software without specific 
//  prior written permission.

define(['readium_shared_js/globals', 'jquery', 'jquery_hammer', 'hammerjs'], function (Globals, $, jqueryHammer, Hammer) {

    var gesturesHandler = function (reader, viewport) {

        var onSwipeLeft = function () {
            reader.openPageRight();
        };

        var onSwipeRight = function () {
            reader.openPageLeft();
        };


        this.initialize = function () {


            reader.on(ReadiumSDK.Events.CONTENT_DOCUMENT_LOADED, function (iframe, spineItem) {
                console.log("hit/ here is your frame");
                var hammertime = new Hammer(iframe[0].contentWindow.document);
                console.log("hammertime");

                hammertime.on('swipeleft', function (ev) {
                    console.log(ev);
                    onSwipeLeft();
                });
                hammertime.on('swiperight', function (ev) {
                    console.log(ev);
                    onSwipeRight();
                });
                hammertime.on('tap', function (ev) {
                    console.log(ev);
                    if($(document.body).hasClass('hide-ui')){
                        $(document.body).removeClass('hide-ui');
                    } else {
                        $(document.body).addClass('hide-ui');
                    }

                });
            });

            $(viewport).on(
                'touchmove',
                function (e) {
                    if (isGestureHandled()) {
                        e.preventDefault();
                    }
                }
            );

            //handlers on viewport
            $(viewport).hammer().on("swipeleft", function () {
                onSwipeLeft();
            });
            $(viewport).hammer().on("swiperight", function () {
                onSwipeRight();
            });
        }; // TODO upgrade to Hammer API v2

    };
    return gesturesHandler;
});