'use strict';

//Class Parent to instance a new player
class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    set date(date) {
        this.#date = date;
    }

    set hits(hits) {
        this.#hits = hits;
    }

    set percentage(percentage) {
        this.#percentage = percentage.toFixed(2);
    }

    get date() {
        return this.#date;
    }

    get hits() {
        return this.#hits;
    }

    get percentage() {
        return this.#percentage.toFixed(2);
    }

    getInfo() {
        return `Date: ${this.#date} | Hits: ${this.#hits} | Average: ${this.#percentage}%`;
    }
}

//Export functions
export { Score };