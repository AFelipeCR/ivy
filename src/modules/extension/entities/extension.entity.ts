import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, Index } from "typeorm";
import { ExtFunction } from "./ext-function.entity";

@Entity({ name: "extensions" })
export class Extension {
    @PrimaryGeneratedColumn({ name: "extension_id"})
    id: number;

    @Column({ type: "text"})
    name: string;

    @OneToMany(() => ExtFunction, (extFun) => extFun.extension)
    functions: ExtFunction[]
}
