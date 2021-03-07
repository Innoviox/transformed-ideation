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
    document.getElementById('flashcards').insertAdjacentHTML('beforeend', '<div class="flashcard notification">\n' +
        '                                <button class="delete delete-flashcard"></button>\n' +
        '                                <div class="field is-horizontal">\n' +
        '                                    <div class="field-label is-normal">\n' +
        '                                        <label class="label">Front</label>\n' +
        '                                    </div>\n' +
        '                                    <div class="field-body">\n' +
        '                                        <div class="field">\n' +
        '                                            <p class="control">\n' +
        '                                                <input class="input" type="text" placeholder="Text">\n' +
        '                                            </p>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="field is-horizontal">\n' +
        '                                    <div class="field-label is-normal">\n' +
        '                                        <label class="label">Back</label>\n' +
        '                                    </div>\n' +
        '                                    <div class="field-body">\n' +
        '                                        <div class="field">\n' +
        '                                            <p class="control">\n' +
        '                                                <input class="input" type="text" placeholder="Text">\n' +
        '                                            </p>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>');
    del();
};

$("#add").click(add);
$(document).ready(add);