import { panels, mappings } from "./mapping.js"

export class Clock {

  /**
   * Initialize the clock SVG element
   * @constructor
   * @param {string} svgId - The css selector of the svg DOM element to use
   * @param {string} language - The panel and mapping language to use
   * @param {number} spacing - The number of pixel between letters
   */
  constructor(svgId, language, spacing) {
    this.language = language
    this.panel = panels[language]
    this.mapping = mappings[language]
    // make SVG
    this.paper = Snap(svgId);
    // group all rows
    let clock_group = this.paper.group();
    this.panel.forEach((row, row_index) => {
      // group letters for each row
      let row_group = this.paper.group();
      row.forEach((letter, letter_index) => {
        let element = this.paper.text(
          (spacing * letter_index),
          (spacing * row_index),
          letter);
        element.attr({ class: "light_off" });
        row_group.add(element);
      });
      clock_group.add(row_group);
    });

    // center SVG group
    let w = clock_group.getBBox().w + clock_group.getBBox().x;
    let h = clock_group.getBBox().h + clock_group.getBBox().y;
    clock_group.transform(
      't' + (this.paper.node.clientWidth / 2 - w / 2)
      + ',' + (this.paper.node.clientHeight / 2 - h / 2)
    );
  }

  start() {
    setInterval(() => {
      let now = new Date() //new Date(2022, 1, 25, 23, 45, 0);
      let hours = now.getHours();
      let minutes = now.getMinutes();
      this.reset_lights();
      this.ligth_time(hours, minutes, this.language);
    }, 1000)
  }

  /**
   * Light on a spot on the matrix
   * @param {number} i - The letter row index
   * @param {number} j - The letter col index
   */
  light_on(i, j) {
    let element = this.paper.selectAll("g > g")[i][j]
    element.attr({ class: "light_on" });
  }

  /**
   * Light off a spot on the matrix
   * @param {number} i - The letter row index
   * @param {number} j - The letter col index
   */
  light_off(i, j) {
    let element = this.paper.selectAll("g > g")[i][j]
    element.attr({ class: "light_off" });
  }

  /**
   * Light on a list of spot on the matrix
   * @param {number} coordinates - A list of coordinates in the form of a two elements array ([[0,0], [0,1]])
   */
  ligth_word(coordinates) {
    coordinates.forEach(letter => {
      this.light_on(letter[0], letter[1]);
    })
  }

  /**
   * Light off the entire matrix
   */
  reset_lights() {
    this.panel.forEach((row, i) => {
      row.forEach((col, j) => {
        this.light_off(i, j)
      });
    });
  }

  /**
   * Display time as words
   * @param {number} hours - The number of hours to display
   * @param {number} minutes - The number of minutes to display
   */
  ligth_time(hours, minutes) {
    this.ligth_word(this.mapping.words.it);
    this.ligth_word(this.mapping.words.is);

    // hours
    if (minutes >= 35) {
      hours += 1;
    }

    if (this.language === "en") {
      console.log(hours)
      if (hours == 12) {
        this.ligth_word(this.mapping.words.midday);
      } else if (hours == 0 || hours == 24) {
        this.ligth_word(this.mapping.words.midnight);
      } else if (minutes >= 0 && minutes < 5) {
        this.ligth_word(this.mapping.words.hour);
      }
    } else {
      if (hours != 1 && hours != 13) {
        this.ligth_word(this.mapping.words.hours);
      } else {
        this.ligth_word(this.mapping.words.hour);
      }
    }
    this.ligth_word(this.mapping.time.hours[hours % 12]);

    // minutes
    if (minutes >= 5 && minutes < 35) {
      this.ligth_word(this.mapping.words.past);
    }
    if (minutes >= 35 && minutes < 60) {
      this.ligth_word(this.mapping.words.to);
    }

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
      this.ligth_word(this.mapping.time.minutes[25]);
    } else if (minutes >= 40 && minutes < 45) {
      this.ligth_word(this.mapping.time.minutes[20]);
    } else if (minutes >= 45 && minutes < 50) {
      this.ligth_word(this.mapping.words.the);
      this.ligth_word(this.mapping.time.minutes[15]);
    } else if (minutes >= 50 && minutes < 55) {
      this.ligth_word(this.mapping.time.minutes[10]);
    } else if (minutes >= 55 && minutes < 60) {
      this.ligth_word(this.mapping.time.minutes[5]);
    }
  }
}
