let flip = () => {
    $(".flip-card-inner").toggleClass("flipped");
};

$("#extract, #upload-new").click(flip);

let modal = () => {
    $("html").toggleClass("is-clipped");
    $("#export-modal").toggleClass("is-active");
};

$("#export, .closemodal").click(modal);

// let t = new Tether({
//     element: $("#element"),
//     target: $("#tether"),
//     attachment: 'top right',
//     targetAttachment: 'top left',
//     // offset: '0 10px',
//     // targetOffset: '20px 0'
// });
//
