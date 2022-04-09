// TODO: redraw on cells text change

function btn_create_cells() {
    div_cells_values.innerHTML = "";
    let cells_count = parseInt(input_cells_count.value);

    for (let i = 0; i < cells_count; i++) {
        let el = create_cell_value_field();
        div_cells_values.appendChild(el);
    }

    redraw_canvas();
}

function create_cell_value_field() {
    let el = document.createElement("input");
    el.type = "number";
    el.value = Math.floor(Math.random() * canv.height);

    return el;
}

function redraw_canvas() {
    let cells_count = parseInt(input_cells_count.value);
    let ctx = canv.getContext("2d");
    ctx.reset();

    const CANVAS_WIDTH = canv.width;
    const CANVAS_HEIGHT = canv.height;

    const RECT_WIDTH = CANVAS_WIDTH / cells_count;
    const RECTS_GAP = 0;

    let dx = 0;
    for (const el of div_cells_values.children) {
        let height = el.value;

        ctx.fillRect(dx, CANVAS_HEIGHT, RECT_WIDTH, -height);

        dx += RECT_WIDTH + RECTS_GAP;
    }
}
