import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateFriendlyUrlRequest {
    @IsNotEmpty()
    @IsUrl()
    sourceUrl: string;
}