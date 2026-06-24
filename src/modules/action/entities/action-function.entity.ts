import { ExtFunction } from "src/modules/extension/entities/ext-function.entity";
import { Route } from "src/modules/route/entities/route.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";
import { Action } from "./action.entity";

@Entity({ name: "action_functions" })
export class ActionFunction {
    @PrimaryGeneratedColumn({ name: "actionfunction_id"})
    id: number;

    @Column("simple-json", { nullable: true })
    values: string[];

    @ManyToOne(() => Action, (action) => action.functions)
    @JoinColumn({ name: "action_id" })
    action: Action;

    @ManyToOne(() => ExtFunction, (extFun) => extFun.actions)
    @JoinColumn({ name: "function_id" })
    function: ExtFunction
}
