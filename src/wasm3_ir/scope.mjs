export class Scope {
    constructor(parent = null) {
        this.parent = parent;
        this.vars = new Map();
    }

    child() {
        return new Scope(this);
    }

    set(name, value) {
        this.vars.set(name, value);
    }

    lookup(name) {
        return this.vars.get(name) ?? this.parent?.lookup(name) ?? null;
    }
}
