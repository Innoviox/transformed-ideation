let input_type = 0;

let flip = () => {
    $(".flip-card-inner").toggleClass("flipped");
};

$("#extract").click(() => {

    var url = document.querySelector('#input-url');
    var file = document.querySelector('#input-file');
    var raw = document.querySelector('#input-raw');

    if (url.value != "") {
        console.log("url");
        
        var payload = {"payload": url.value};
        axios.post('/link', payload);
    } else if (file.value != "") {
        console.log("file");

        var formData = new FormData();
        formData.append("file", file.files[0]);
        axios.post('/file', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });
    } else if (raw.value != "") {
        console.log("raw");

        var payload = {"payload": raw.value}
        axios.post('/text', payload);
    }
    // console.log(url.value);
    // console.log(file.value);
    // console.log(raw.value);
    flip();
});


$("#upload-new").click(() => {
    // Check with precedence

    // let fdata = new FormData();
    // if (input_type === 0) {
    //     fdata.append("link", $("#url").val());
    // } else {
    //     fdata.append("file", document.getElementById('file').files[0]);
    // }

    // $.ajax({
    //     url: "/link",
    //     data: fdata,
    //     cache: false,
    //     processData: false,
    //     contentType: false,
    //     type: 'POST',
    //     success: function (dataofconfirm) {
    //         flip();
    //     }
    // });
    
    flip();
    // formData.append("image", file.files[0]);
    // axios.post('upload_file', formData, {
    //     headers: {
    //     'Content-Type': 'multipart/form-data'
    //     }
    // });
});

// let modal = () => {
//     $("html").toggleClass("is-clipped");
//     $("#export-modal").toggleClass("is-active");
// };
//
// $("#export, .closemodal").click(modal);

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

$("#export").click(() => {
    let s = "";
    let k = 0;
    for (let i of $(".flashcard").find(":input[type=text]")) {
        s += i.value;
        if (k % 2 === 0) {
            s += "\t";
        } else {
            s += "\n";
        }
        k += 1;
    }

    download("export.tsv", s);
});

let del = () => $(".delete-flashcard").click((e) => {
    e.target.parentElement.remove();
});

let add = (front, back) => {
    console.log(front);
    console.log(back);
    document.getElementById('flashcards').insertAdjacentHTML('beforeend', '<div class="flashcard notification"><button class="delete delete-flashcard"></button><div class="field is-horizontal"><div class="field-label is-normal"><label class="label">Front</label></div><div class="field-body"><div class="field"><p class="control"><input class="input" type="text" placeholder="Text"></p></div></div></div><div class="field is-horizontal"><div class="field-label is-normal"><label class="label">Back</label></div><div class="field-body"><div class="field"><p class="control"><input class="input" type="text" placeholder="Text"></p></div></div></div></div>');
    del();
};

$("#add").click(add);
$(document).ready(add);

$('#input-file').change(() => {
    input_type = 1;
    $("#file-holder").toggleClass("has-name");
    $(".file-name").text(document.getElementById("input-file").files[0].name).toggleClass("is-hidden");
    $("#col-b").removeClass("is-4").addClass("is-2");
    $("#col-c").removeClass("is-2").addClass("is-4");
    $("#file-upload").removeClass("file-upload-full");
    $("#enter-url-input").hide();
    $("#enter-url-button").removeClass("is-hidden").show();
});

$("#enter-url-button").click(() => {
    input_type = 0;
    $("#file-holder").toggleClass("has-name");
    $(".file-name").text($("#input-file").val()).toggleClass("is-hidden");
    $("#col-b").removeClass("is-2").addClass("is-4");
    $("#col-c").removeClass("is-4").addClass("is-2");
    $("#file-upload").addClass("file-upload-full");
    $("#enter-url-input").show();
    $("#enter-url-button").addClass("is-hidden").hide();
});


