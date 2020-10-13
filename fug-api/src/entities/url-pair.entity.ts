import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UrlPair {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ unique: true }) sourceUrl: string;
    @Column({ unique: true }) friendlyPath: string;

    constructor(config?: Partial<UrlPair>) {
        if (typeof (config?.sourceUrl) === 'string') {
            if (!config.sourceUrl.includes('https://')) {
                this.sourceUrl = `https://${config.sourceUrl}`
            } else {
                this.sourceUrl = config.sourceUrl;
            }
        }

        if (typeof config?.friendlyPath === 'string') {
            this.friendlyPath = config.friendlyPath;
        }
    }
}