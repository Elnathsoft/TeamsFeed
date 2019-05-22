import { ITeamsService } from './index';
import { IMessageModel } from '../models/index';

export class TeamsServiceFlow implements ITeamsService {
    private flowUrl: string;
    private readonly headers: HeadersInit = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    };

    constructor(flowUrl) {
        this.flowUrl = flowUrl;                    
    }

    public async getMessages(teamId: string, channelId: string): Promise<IMessageModel[]> {
        const body = {
            teamId: teamId,
	        channelId: channelId
        };
        let result: IMessageModel[] = await this.postMessgesRequest(this.flowUrl, this.headers, body);
        console.log(result);
        return result;
    }

    public async postMessgesRequest(url: string, headers: HeadersInit, body: any) {
        return await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => response.json());
    }

}