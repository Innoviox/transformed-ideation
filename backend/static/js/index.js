let input_type = 0;

let flip = () => {
    $(".flip-card-inner").toggleClass("flipped");
};

$("#extract").click(async () => {

    var url = document.querySelector('#input-url');
    var file = document.querySelector('#input-file');
    var raw = document.querySelector('#input-raw');

    var response;
    if (url.value != "") {
        console.log("url");
        
        var payload = {"payload": url.value}
        const res = await axios.post('/link', payload);
        response = res.data
    } else if (file.value != "") {
        console.log("file");

        var formData = new FormData();
        formData.append("file", file.files[0]);
        const res = await axios.post('/file', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });
        response = res.data
    } else if (raw.value != "") {
        console.log("raw");

        var payload = {"payload": raw.value}
        const res = await axios.post('/text', payload);
        response = res.data
    }
    
    console.log(response);
    var source_text = response["source_text"];
    var cards = response["flashcards"];

    console.log(source_text);
    console.log(cards);

    for (var i = 0; i < cards.length; i++){
        var c = cards[i];
        console.log(c);
        add(c["question"], c["answer"]);
    }

    $("#source-text").val(source_text);
    flip();
});


$("#upload-new").click(() => {
    flip();
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
    document.getElementById('flashcards').insertAdjacentHTML('beforeend', 
`<div class="flashcard notification"><button class="delete delete-flashcard"></button> <div class="field is-horizontal"> <div class="field-label is-normal"><label class="label">front</label></div> <div class="field-body"> <div class="field"> <p class="control"><input class="input" type="text" value="${front}"></p> </div> </div> </div> <div class="field is-horizontal"> <div class="field-label is-normal"><label class="label">back</label></div> <div class="field-body"> <div class="field"> <p class="control"><input class="input" type="text" value="${back}"></p> </div> </div> </div> </div>`    );
    del();
};

$("#add").click(add);
// $(document).ready(add);

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


