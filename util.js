
class Grid {

	constructor(row_count, column_count, cell_size) {

		this.row_count = row_count;
		this.column_count = column_count;
		this.cell_size = cell_size;

		this.cells = [];

		for(var x=0; x<this.row_count; x++) {
			var row = [];
			for(var y=0; y<this.column_count; y++) {
				row.push(new Cell(x, y, cell_size))
			}
			this.cells.push(row);
		}
	}

	update(mouse, ctx) {
		for(var x=0; x<this.row_count; x++) {
			for(var y=0; y<this.column_count; y++) {
				var c = this.cells[x][y];
				
				if ((c.x <= mouse.x) && (mouse.x < c.x+c.size) && 
					(c.y <= mouse.y) && (mouse.y < c.y+c.size)) {	
					c.onHover();
					displayCellIndex(x, y)

					if(mouse.isClicked)
						c.onClick(swatch.color);
				}
				else c.onUnhover();

				c.draw(ctx)
			}
		}
	}

	export() {
		let arr = [];
		for(var x=0; x<this.row_count; x++) {
			for(var y=0; y<this.column_count; y++) {
				arr.push(this.cells[x][y].color);
			}
		}
		return JSON.stringify(arr);
	}

	import(data) {
		for(var x=0; x<this.row_count; x++) {
			for(var y=0; y<this.column_count; y++) {
				this.cells[x][y].color = data[x*this.row_count+y]
			}
		}
	}
}


class Cell {

	constructor(x_index, y_index, size) {
		this.padding = 1;
		this.size = size;
		this.x = x_index * this.size;
		this.y = y_index * this.size;
		this.color = "#ffffff"; // default is white
		this.isHovered = false;
	}

	onHover() { this.isHovered = true; }
	onUnhover () { this.isHovered = false; }
	onClick(color) { this.color = color; }

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x+this.padding, 
			this.y+this.padding, 
			this.size-this.padding*2, 
			this.size-this.padding*2);

		if (this.isHovered) {
			ctx.strokeStyle = "#00f";
			ctx.strokeRect(this.x, this.y, this.size, this.size);
		}
	}

}

class Swatch {
    constructor(color_array) {
        this.colors = color_array; // alleen de echte kleuren
        this.color = color_array[0]; // standaard geselecteerde kleur
        this.eraserColor = "#ffffff"; // gumkleur
    }

    setSwatchView() {
        const swatches = document.getElementsByClassName("swatch-color");
        for (let i = 0; i < swatches.length; i++) {
            if (i === 0) {
                // Eerste vak = gum
                swatches[i].style.background = this.eraserColor;
                swatches[i].addEventListener("click", () => {
                    this.color = this.eraserColor;
                });
            } else if (this.colors[i - 1]) {
                // overige kleuren
                swatches[i].style.background = this.colors[i - 1];
                swatches[i].addEventListener("click", () => {
                    this.color = this.colors[i - 1];
                });
            }
        }
    }
}