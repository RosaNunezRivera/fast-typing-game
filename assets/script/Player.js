'use strict';

//Class Parent to instance a new player
class PlayerBase {
    #user;
    #fullname;
    #email;

    constructor(fullname, user, email) {
        this.#fullname = fullname;
        this.#user = user;
        this.#email = email;
    }

    set fullname(fullname) {
        this.#fullname = fullname;
    }

    set user(user) {
        this.#user = user;
    }

    set email(email) {
        this.#email = email;
    }

    get fullname() {
        return this.#fullname;
    }

    get user() {
        return this.#user;
    }

    get email() {
        return this.#email;
    }

    getInfo() {
        return `${this.#fullname},${this.#user},${this.#email}`;

    }
}

class Player extends PlayerBase {
    #avatar;
    #score;


    constructor(fullname, user, email, avatar, score) {
        super(id, fullname, user, email);
        this.#avatar = avatar;
        this.#score = score;
    }

    set avatar(avatar) {
        this.#avatar = avatar;
    }

    set score(score) {
        this.#score = groups;
    }

    get avatar() { return this.#score; }
    get score() { return this.#score; }


    getInfo() {
        let response = `${this.fullname},${this.user},${this.email},${this.#avatar},${this.#score}`;
        return response;
    }

}

//Export functions
export { PlayerBase, Player };