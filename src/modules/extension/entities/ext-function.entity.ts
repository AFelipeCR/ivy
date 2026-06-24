import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import { Extension } from "./extension.entity";
import { ActionFunction } from "src/modules/action/entities/action-function.entity";

@Entity({ name: "ext_functions" })
export class ExtFunction {
    @PrimaryGeneratedColumn({ name: "function_id"})
    id: number;

    @Column({ type: "text"})
    name: string;

    @Column({ type: "text"})
    alias: string;

    @Column("simple-json", { nullable: true })
    inputs: string[];
    
    @ManyToOne(() => Extension, (extension) => extension.functions)
    @JoinColumn({ name: "extension_id" })
    extension: Extension;

    @OneToMany(() => ActionFunction, (actionFunc) => actionFunc.function)
    @JoinColumn({ name: "action_id" })
    actions: ActionFunction[]
}
