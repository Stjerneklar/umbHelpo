// ==UserScript==
// @name         FORADEV UMBHELPO
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  BETTER BACKEND
// @author       ANDREAS
// @require      http://code.jquery.com/jquery-latest.js
// @match        https://fagkursus.dk/umbraco*
// @match        https://test2.fo.dk/umbraco*
// @icon         https://www.google.com/s2/favicons?domain=fagkursus.dk
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';


    //make jquery :contains case insensitive
    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    jQuery(document).ready(function(){

        $("body").append(`<a id="visSidebtn">Vis Node</a><input id="qsearch" type="text" style="display:none;">`);

        //quicksearch - filter tree nodes
        $("#qsearch").keyup(function () {
            $(".umb-tree li").hide();
            $(".umb-tree li:contains("+this.value+")").show();
        });

        //toggle quicksearch visibility & focus, reset when toggling off - bound to ½
        $("body").bind("keypress", function(e) {
            if (e.keyCode == 189) {
                e.preventDefault();
                if ($("#qsearch").is(":visible")) {
                    $("#qsearch").val('').hide();
                    $(".umb-tree li").show();
                }
                else {
                    $("#qsearch").show().focus();
                }
            }
        });


        $("#visSidebtn").click(function() {  //needs to run when its clicked rather than placing a link due to umbracos node navigation
            var currenturl = window.location.href;// https://fagkursus.dk/umbraco/#/content/content/edit/23175
            var origin = window.location.origin;// https://fagkursus.dk
            currenturl = currenturl.split("/").pop();
            let vsLink = origin +"/"+ currenturl;
            document.location=vsLink;
        });

        $("body").append(`
        <style>

        input#qsearch {
    position: absolute;
    top: 20px;
    left: 50%;
    z-index: 999999999;
}

        #visSidebtn {
    position: absolute;
    bottom: 15px;
    right: 400px;
    z-index: 9999999999;
    cursor: pointer;
}

/* vertically compress left-tree nav */
        .umb-tree li {
    line-height: 15px;
    font-size:14px;
}

.umb-tree-header, .umb-tree li.root>div:first-child h5>a {
    padding: 10px 0 10px 10px;
}

#search-form .form-search {
    margin: 4px;
}

.umb-modalcolumn-header {height: 45px;}

.umb-modalcolumn-body {
    top: 51px;
}

.ui-resizable-e {     right: -6px;}

        </style>
        `);

    });
})();
