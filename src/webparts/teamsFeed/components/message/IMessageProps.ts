import { IMessageModel } from '../../../../models';

export interface IMessageProps {
    message: IMessageModel;
    channelId: string;
}