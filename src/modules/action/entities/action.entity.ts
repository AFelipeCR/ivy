import { Route } from "src/modules/route/entities/route.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from "typeorm";
import { ActionFunction } from "./action-function.entity";

@Entity({ name: "actions" })
export class Action {
    @PrimaryGeneratedColumn({ name: "action_id"})
    id: number;

    @Column({ type: "text"})
    command: string;
    
    @Column("simple-json", { name: "selected_events" })
    selectedEvents: string[];

    @ManyToOne(() => Route, (route) => route.actions)
    @JoinColumn({ name: "route_id" })
    route: Route;

    @OneToMany(() => ActionFunction, (extFun) => extFun.action)
    @JoinColumn({ name: "function_id" })
    functions: ActionFunction[]
}
