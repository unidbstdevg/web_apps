var cells = [];

window.addEventListener("load", function () {
    document.forms[0].addEventListener("submit", (ev) => {
        ev.preventDefault();
    });

    fetch_cells(() => {
        redraw_canvas();
    });
});

function btn_fetch_cells() {
    fetch_cells(() => {
        redraw_canvas();
    });
}

function form_add_cell() {
    add_cell(() => {
        redraw_canvas();
    });
}

function add_cell(callback) {
    let form = document.forms[0];
    if (!form.checkValidity()) {
        return;
    }

    let url = "api/add_cell.php";
    fetch(url, { method: "POST", body: new FormData(form) }).then(
        async (response) => {
            if (response.ok) {
                let new_cell = parseInt(form.cell_value.value);
                cells.push(new_cell);

                form.reset();

                callback();
            } else {
                alert(
                    "Error " + response.status + " on adding cell: " +
                        await response.text(),
                );
            }
        },
    );
}

function fetch_cells(callback) {
    var url = "api/get_cells.php";
    fetch(url, { method: "POST" }).then(
        async (response) => {
            if (response.ok) {
                cells = await response.json();

                callback();
            } else {
                alert(
                    "Error " + response.status + " on fetching cells: " +
                        await response.text(),
                );
            }
        },
    );
}

function redraw_canvas() {
    let CANVAS_WIDTH = canv.width;
    let CANVAS_HEIGHT = canv.height;
    let RECT_WIDTH = CANVAS_WIDTH / cells.length;

    let ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let dx = 0;
    for (let val of cells) {
        ctx.fillRect(
            dx,
            CANVAS_HEIGHT,
            RECT_WIDTH,
            -val,
        );

        dx += RECT_WIDTH;
    }
}
