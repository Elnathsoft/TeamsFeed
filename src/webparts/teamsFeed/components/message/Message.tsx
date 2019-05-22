import * as React from 'react';
import * as moment from 'moment';
import { IMessageProps, IMessageState } from '.';
import styles from './Message.module.scss';
import { IMessageAttachment, MessageConstants, IAdaptiveCard } from '../../../../models';

export class Message extends React.Component<IMessageProps, IMessageState> {

    constructor(props: IMessageProps) {
        super(props);
    }

    public render(): React.ReactElement<IMessageProps> {
        return <div className={styles.message}>
            <a href={this.getMessageUrl()} className={styles.link}>
                <div className={styles.topRow}>
                    <div className={styles.author}>{this.getAuthor()}</div>
                    <div className={styles.timeStamp}>{moment(this.props.message.createdDateTime).calendar()}</div>
                </div>
                {this.getSubject()}
                <div dangerouslySetInnerHTML={{ __html: this.getContent() }}></div>
            </a>
        </div>;
    }

    private getMessageUrl(): string {
        return `https://teams.microsoft.com/l/message/${this.props.channelId}/${this.props.message.id}`;
    }

    private getContent(): string {
        if (this.props.message.body.content.substr(0,11) !== '<attachment')
            return this.props.message.body.content;
        if (this.props.message.attachments.length > 0) {
            return this.getAttachmentContent(this.props.message.attachments[0]);
        }
    }

    private getAttachmentContent(attachment: IMessageAttachment): string {
        if (attachment.contentType === MessageConstants.ContentTypeAdaptive) {
            const body = JSON.parse(attachment.content).body;
            return this.getAttachmentBodyAsHtml(body);
        }
        if (attachment.contentType === MessageConstants.ContentTypeHero) {
            return JSON.parse(attachment.content).text;
        }
        return '';
    }

    private getAttachmentBodyAsHtml(body: any[]): string {
        let html: string = '';
        body.forEach((element: IAdaptiveCard) => {
            if (element.type === MessageConstants.AdaptiveCardTextBlock) {
                html += `<div>${element.text}</div>`;
            }
        });
        return html;
    }


    private getSubject(): React.ReactNode {
        return this.props.message.subject ? <div className={styles.subject}>{this.props.message.subject}</div> : [];
    }

    private getAuthor(): string {
        const from = this.props.message.from;
        if (from.user)
            return from.user.displayName;
        if (from.application)
            return from.application.displayName;
        return '';
    }
}