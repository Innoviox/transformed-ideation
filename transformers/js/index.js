let flip = () => {
    $(".flip-card-inner").toggleClass("flipped");
}

$("#extract").click(flip);
$("#upload-new").click(flip);

// let t = new Tether({
//     element: $("#element"),
//     target: $("#tether"),
//     attachment: 'top right',
//     targetAttachment: 'top left',
//     // offset: '0 10px',
//     // targetOffset: '20px 0'
// });
//
