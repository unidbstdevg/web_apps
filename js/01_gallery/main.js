const IMGS_COUNT = 9;

var selected_img_index = 0;
var imgs = [];

window.addEventListener("load", function () {
    init_images();
});

function init_images() {
    for (let i = 0; i < IMGS_COUNT; i++) {
        let _img = document.createElement("img");
        imgs_list.appendChild(_img);
        _img.src = "img/" + i + ".png";
        _img.className = "small-img";
        _img.onclick = () => {
            pick_image(i);
        };

        imgs.push(_img);
    }
}

function pick_image(index) {
    if (index < 0) {
        index = IMGS_COUNT - 1;
    }
    if (index >= IMGS_COUNT) {
        index = 0;
    }

    imgs[selected_img_index].classList.remove("selected-img");

    selected_img_index = index;

    let cur_img = imgs[index];

    cur_img.classList.add("selected-img");

    big_img.src = cur_img.src;
}

function next_img() {
    pick_image(selected_img_index + 1);
}
function prev_img() {
    pick_image(selected_img_index - 1);
}
