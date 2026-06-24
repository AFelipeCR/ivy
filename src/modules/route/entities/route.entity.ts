import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index, OneToMany } from "typeorm";
import { Session } from "../../session/entities/session.entity";
import { Action } from "src/modules/action/entities/action.entity";

@Entity({ name: "routes" })
export class Route {
    @PrimaryGeneratedColumn({ name: "route_id"})
    id: number;

    @Index({ unique: true })
    @Column({ type: "text"})
    endpoint: string;
    
    @Column({ type: "text"})
    name: string

    @Column({ type: "text"})
    events: string

    @ManyToMany(() => Session, (session) => session.routes)
    sessions:Session[];

    @OneToMany(() => Action, (action) => action.route)
    actions: Action[];
}
