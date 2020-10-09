import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UrlPair {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ unique: true }) sourceUrl: string;
    @Column({ unique: true }) friendlySlug: string;
}