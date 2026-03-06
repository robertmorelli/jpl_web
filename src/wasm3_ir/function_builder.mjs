export class FunctionBuilder {
    constructor(func, registry) {
        this.func = func;
        this.registry = registry;
        this.localCounter = 0;
    }

    allocLocal(prefix, type) {
        const local = `$${prefix}_${this.localCounter++}`;
        this.func.locals.push({ name: local, type });
        return local;
    }
}
