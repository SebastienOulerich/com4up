/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

import Cropper from 'cropperjs/dist/cropper'
import axios from 'axios'

window.URL = window.URL || window.webkitURL;
const fileElem = document.getElementsByClassName("fileElem"),
    fileList = document.getElementById("fileList");

var cropperCanvas;
const image = document.getElementById('image');
const cropper = new Cropper(image, {
    cropBoxResizable: false,
    mouseWheelZoom: false,
    touchDragZomm: false,
    data: {
        x: 0,
        y: 0,
        width: 480,
        height: 224
    },
    crop(event) {
        console.log("before canvas");

        this.canvas = cropper.getCroppedCanvas();
        console.log(this.canvas);

    },
});
console.log(cropper.getCroppedCanvas());



window.handleFiles = function(files) {

    if (!files.length) {}
    fileList.innerHTML = "";
    const list = document.createElement("ul");
    fileList.appendChild(list);
    for (let i = 0; i < files.length; i++) {
        const li = document.createElement("li");
        list.appendChild(li);
        const img = document.createElement("img");
        img.src = window.URL.createObjectURL(files[i]);
        img.id = "image";
        const button = document.createElement("button");
        button.type = "button";
        button.id = "projectImage";
        button.setAttribute("onClick", "setImage('miniature')");
        var text = document.createTextNode("Button");
        button.appendChild(text);

        img.onload = function() {
            window.URL.revokeObjectURL(this.src);
        }
        li.appendChild(img);
        li.appendChild(button);
        reloadCropper();

    }
}


window.ajaxWithAxio = function(blob, type) {
    let data = new FormData();
    var miniatureId = document.getElementById("project_id").getAttribute('value');;
    console.log("test");
    console.log(miniatureId);
    console.log("test");
    // if ('{{ action }}' != 'new') {
    //     console.log('{{action}}') { % if project.miniature is defined or project.banner is defined % }
    // if (type == "miniature" && {
    //             { project.miniature }
    //         } !== undefined)
    data.append('id', miniatureId.value);
    //     else if (type == "banner")
    //         data.append('id', {
    //             { project.banner.id }
    //         }); { % endif % }
    // }
    data.append('image', blob);
    data.append('type', type);
    // data.append('type', "miniature");

    axios({ method: "post", url: "/upload", data: data }).then((response) => {
        var t = JSON.parse(response.data);
        //     console.log(t.name);
        $('#project').append('<input type="hidden" name="' + t.type + '" value="' + t.name + '" /> ');

    }).catch((error) => {
        console.log(error);
    })
}

window.setImage = function(type) {
    const list = document.createElement("ul");
    fileList.appendChild(list);
    const li = document.createElement("li");
    list.appendChild(li);
    var canvasData = cropper.getCroppedCanvas().toDataURL("image/png");

    list.appendChild(cropper.getCroppedCanvas());
    cropper.getCroppedCanvas().toBlob(function(blob) {
        ajaxWithAxio(blob, type);
    })
}