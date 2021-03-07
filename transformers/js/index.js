let flip = () => {
    $(".flip-card-inner").toggleClass("flipped");
};

$("#extract, #upload-new").click(flip);

let modal = () => {
    $("html").toggleClass("is-clipped");
    $("#export-modal").toggleClass("is-active");
};

$("#export, .closemodal").click(modal);

$(".delete-flashcard").click((e) => {
    e.target.parentElement.remove();
});
