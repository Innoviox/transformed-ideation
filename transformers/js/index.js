let flip = () => {
    $(".flip-card-inner").toggleClass("flipped");
};

$("#extract, #upload-new").click(flip);

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