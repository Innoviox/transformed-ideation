let input_type = 0;

let flip = () => {
    $(".flip-card-inner").toggleClass("flipped");
};

$("#extract").click(() => {
    let fdata = new FormData();
    if (input_type === 0) {
        url = encodeURI("http://127.0.0.1:8000/link?url=" + $("#url").val())
        let response = await fetch(url);
        let questions = await response.json(); // read response body and parse as JSON
        console.log(questions)
    } else {
        url = encodeURI("http://127.0.0.1:8000/link?url=" + $("#url").val())
        let response = await fetch(url);
        let questions = await response.json(); // read response body and parse as JSON
        console.log(questions)
        // fdata.append("file", document.getElementById('file').files[0]);
        // $.ajax({
        //     url: "http://127.0.0.1:8000/file",
        //     data: fdata,
        //     cache: false,
        //     processData: false,
        //     contentType: false,
        //     type: 'GET',
        //     success: function (res) {
        //         console.log(res)
        //     }
        // });
    }
});


$("#upload-new").click(() => {
    flip();
});

let modal = () => {
    $("html").toggleClass("is-clipped");
    $("#export-modal").toggleClass("is-active");
};

$("#export, .closemodal").click(modal);

let del = () => $(".delete-flashcard").click((e) => {
    e.target.parentElement.remove();
});

let add = () => {
    document.getElementById('flashcards').insertAdjacentHTML('beforeend', '<div class="flashcard notification"><button class="delete delete-flashcard"></button><div class="field is-horizontal"><div class="field-label is-normal"><label class="label">Front</label></div><div class="field-body"><div class="field"><p class="control"><input class="input" type="text" placeholder="Text"></p></div></div></div><div class="field is-horizontal"><div class="field-label is-normal"><label class="label">Back</label></div><div class="field-body"><div class="field"><p class="control"><input class="input" type="text" placeholder="Text"></p></div></div></div></div>');
    del();
};

$("#add").click(add);
$(document).ready(add);

$('#file').change(() => {
    input_type = 1;
    $("#file-holder").toggleClass("has-name");
    $(".file-name").text(document.getElementById("file").files[0].name).toggleClass("is-hidden");
    $("#col-b").removeClass("is-4").addClass("is-2");
    $("#col-c").removeClass("is-2").addClass("is-4");
    $("#file-upload").removeClass("file-upload-full");
    $("#enter-url-input").hide();
    $("#enter-url-button").toggleClass("is-hidden").show();
});

$("#enter-url-button").click(() => {
    input_type = 0;
    $("#file-holder").toggleClass("has-name");
    $(".file-name").text($("#file").val()).toggleClass("is-hidden");
    $("#col-b").removeClass("is-2").addClass("is-4");
    $("#col-c").removeClass("is-4").addClass("is-2");
    $("#file-upload").addClass("file-upload-full");
    $("#enter-url-input").show();
    $("#enter-url-button").toggleClass("is-hidden").hide();
});


