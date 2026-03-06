import { typeKey, valTypeForJPLType } from "./types.mjs";

export class TypeRegistry {
    constructor(module) {
        this.module = module;
        this.structIds = new Map();
        this.arrayDataIds = new Map();
        this.arrayBindingIds = new Map();
    }

    structTypeId(name) {
        return this.structIds.get(name) ?? `$${name}`;
    }

    ensureStruct(name, fields) {
        if (this.structIds.has(name)) return this.structIds.get(name);

        const id = `$${name}`;
        this.structIds.set(name, id);
        this.module.types.push({
            id,
            kind: "struct",
            fields,
        });
        return id;
    }

    ensureArrayDataType(elemType) {
        const key = typeKey(elemType);
        if (this.arrayDataIds.has(key)) return this.arrayDataIds.get(key);

        const id = `$jpl_data_${key.replace(/[^a-zA-Z0-9_]/g, "_")}`;
        this.arrayDataIds.set(key, id);
        this.module.types.push({
            id,
            kind: "array",
            element: valTypeForJPLType(elemType, this),
            mutability: "mut",
        });
        return id;
    }

    ensureArrayBindingType(elemType, rank) {
        const key = `${typeKey(elemType)}#${rank}`;
        if (this.arrayBindingIds.has(key)) return this.arrayBindingIds.get(key);

        const dataId = this.ensureArrayDataType(elemType);
        const id = `$jpl_arr_r${rank}_${typeKey(elemType).replace(/[^a-zA-Z0-9_]/g, "_")}`;

        const fields = [];
        for (let i = 0; i < rank; i++) {
            fields.push({ name: `d${i + 1}`, type: "i64", mutability: "mut" });
        }
        fields.push({
            name: "data",
            type: { ref: dataId, nullable: true },
            mutability: "mut",
        });

        this.arrayBindingIds.set(key, id);
        this.module.types.push({ id, kind: "struct", fields });
        return id;
    }
}
