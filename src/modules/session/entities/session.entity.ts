import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from "typeorm";
import { Route } from "../../route/entities/route.entity";

@Entity({ name: "sessions" })
export class Session {
    @PrimaryColumn({ name: "session_id", type: "text" })
    id: string

    @Column({ type: "text"})
    name: string

    @Column({ type: "text"})
    description: string

    @Column({ type: "text"})
    phone: string;

    @ManyToMany(() => Route, (route) => route.sessions)
    @JoinTable({ name: "session_routes" })
    routes: Route[];
}
