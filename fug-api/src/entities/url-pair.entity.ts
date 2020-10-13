import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UrlPair {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ unique: true }) sourceUrl: string;
    @Column({ unique: true }) friendlyPath: string;

    constructor(config?: Partial<UrlPair>) {
        if (typeof (config?.sourceUrl) === 'string') {
            this.sourceUrl = UrlPair.createSourceUrl(config.sourceUrl);
        }

        if (typeof config?.friendlyPath === 'string') {
            this.friendlyPath = config.friendlyPath;
        }
    }

    /**
     * Adds http:// to url if missing, browser will automaticly redirect to https:// if required.
     * @param sourceUrl 
     */
    public static createSourceUrl(sourceUrl: string) {
        if (/^(?:http(s)?:\/\/)/.test(sourceUrl)) {
            return sourceUrl;
        } else {
            return `http://${sourceUrl}`;
        }
    }
}