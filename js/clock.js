
export class Clock {
	
	constructor(svgId) {
		this.letters = [
			["I", "L", "N", "E", "S", "T", "O", "U", "N", "E", "R"],
			["D", "E", "U", "X", "N", "U", "T", "R", "O", "I", "S"],
			["Q", "U", "A", "T", "R", "E", "D", "O", "U", "Z", "E"],
			["C", "I", "N", "Q", "S", "I", "X", "S", "E", "P", "T"],
			["H", "U", "I", "T", "N", "E", "U", "F", "D", "I", "X"],
			["O", "N", "Z", "E", "R", "H", "E", "U", "R", "E", "S"],
			["M", "O", "I", "N", "S", "O", "L", "E", "D", "I", "X"],
			["E", "T", "R", "Q", "U", "A", "R", "T", "R", "E", "D"],
			["V", "I", "N", "G", "T", "-", "C", "I", "N", "Q", "U"],
			["E", "T", "S", "D", "E", "M", "I", "E", "P", "A", "N"]
		];
		
		this.mapping = {
			words: {
				it: [[0, 0], [0, 1]], // il
				is: [[0, 3], [0, 4], [0, 5]], // est
				hour: [[5, 5], [5, 6], [5, 7], [5, 8], [5, 9]], // heure
				hours: [[5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10]],  // heures
				and: [[7, 0], [7, 1]], // et
				the: [[6, 6], [6, 7]], // le
				past: [], //
				to: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4]] // moins
			},
			time: {
				hours: {
					0: [[2, 6], [2, 7], [2, 8], [2, 9], [2, 10]], // douze
					1: [[0, 7], [0, 8], [0, 9]], // une
					2: [[1, 0], [1, 1], [1, 2], [1, 3]], // deux
					3: [[1, 6], [1, 7], [1, 8], [1, 9], [1, 10]], // trois
					4: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]], // quatre
					5: [[3, 0], [3, 1], [3, 2], [3, 3]], // cinq
					6: [[3, 4], [3, 5], [3, 6]], // six
					7: [[3, 7], [3, 8], [3, 9], [3, 10]], // sept
					8: [[4, 0], [4, 1], [4, 2], [4, 3]], // huit
					9: [[4, 4], [4, 5], [4, 6], [4, 7]], // neuf
					10: [[4, 8], [4, 9], [4, 10]], // dix
					11: [[5, 0], [5, 1], [5, 2], [5, 3]] // onze
				},
				minutes: {
					5: [[8, 6], [8, 7], [8, 8], [8, 9]], // cinq
					10: [[6, 8],[6, 9], [6, 10]], // dix
					15: [[7, 3], [7, 4], [7, 5], [7, 6], [7, 7]], // quart
					20: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4]], // vingt
					25: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9]], // vingt-cinq
					30: [[9, 3], [9, 4], [9, 5], [9, 6]] // demi
				}
			}
		};
		
		// make SVG
		this.paper = Snap(svgId);
		// group all rows
		let clock_group = this.paper.group();
		this.letters.forEach((row, row_index) => {
			// group letters for each row
			let row_group = this.paper.group();
			row.forEach((letter, letter_index) => {
				let element = this.paper.text(
					(20 * letter_index), 
					(20 * row_index), 
					letter);
				element.attr({class: "light_off"});
				row_group.add(element);
			});
			clock_group.add(row_group);
		});
		
		// center SVG group
		let w = clock_group.getBBox().w + clock_group.getBBox().x;
		let h = clock_group.getBBox().h + clock_group.getBBox().y;
		clock_group.transform(
			't' + (this.paper.node.clientWidth / 2  - w/2)
			+ ',' + (this.paper.node.clientHeight / 2 - h/2)
		);
    }
	
	start() {
		setInterval(() => {
			let now = new Date();
			let hours = now.getHours();
			let minutes = now.getMinutes();
			this.reset_lights();
			this.set_time(hours, minutes);
		}, 1000)
	}
	
	light_on(i, j) {
		let element = Snap.selectAll("g > g")[i][j]
		element.attr({class: "light_on"});
	}
	
	light_off(i, j) {
		let element = Snap.selectAll("g > g")[i][j]
		element.attr({class: "light_off"});
	}
	
	ligth_word(list) {
		list.forEach( letter => {
			this.light_on(letter[0], letter[1]);
		})
	}
	
	reset_lights() {
		this.letters.forEach((row, i) => {
			row.forEach((col, j) => {
				this.light_off(i,j)
			});
		});
	}
		
	set_time(hours, minutes) {
		this.ligth_word(this.mapping.words.it);
		this.ligth_word(this.mapping.words.is);
		
		// hours
		if (minutes >= 35) {
			hours += 1;
		}
		this.ligth_word(this.mapping.time.hours[hours%12]);
		
		if (hours != 1 && hours != 13) {
			this.ligth_word(this.mapping.words.hours);
		} else {
			this.ligth_word(this.mapping.words.hour);
		}
		
		// minutes
		if (minutes >= 5 && minutes < 10) {
			this.ligth_word(this.mapping.time.minutes[5]);
		} else if (minutes >= 10 && minutes < 15) {
			this.ligth_word(this.mapping.time.minutes[10]);
		} else if (minutes >= 15 && minutes < 20) {
			this.ligth_word(this.mapping.words.and);
			this.ligth_word(this.mapping.time.minutes[15]);
		} else if (minutes >= 20 && minutes < 25) {
			this.ligth_word(this.mapping.time.minutes[20]);
		} else if (minutes >= 25 && minutes < 30) {
			this.ligth_word(this.mapping.time.minutes[25]);
		} else if (minutes >= 30 && minutes < 35) {
			this.ligth_word(this.mapping.words.and);
			this.ligth_word(this.mapping.time.minutes[30]);
		} else if (minutes >= 35 && minutes < 40) {
			this.ligth_word(this.mapping.words.to);
			this.ligth_word(this.mapping.time.minutes[25]);
		} else if (minutes >= 40 && minutes < 45) {
			this.ligth_word(this.mapping.words.to);
			this.ligth_word(this.mapping.time.minutes[20]);
		} else if (minutes >= 45 && minutes < 50) {
			this.ligth_word(this.mapping.words.to);
			this.ligth_word(this.mapping.words.the);
			this.ligth_word(this.mapping.time.minutes[15]);
		} else if (minutes >= 50 && minutes < 55) {
			this.ligth_word(this.mapping.words.to);
			this.ligth_word(this.mapping.time.minutes[10]);
		} else if (minutes >= 55 && minutes < 60) {
			this.ligth_word(this.mapping.words.to);
			this.ligth_word(this.mapping.time.minutes[5]);
		}
	}
}