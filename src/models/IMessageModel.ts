export interface IMessageModel {
    attachments?: IMessageAttachment[];
    body?: IMessageBody;
    createdDateTime?: Date;
    deletedDateTime?: Date;
    etag?: string;
    from?: IMessageFrom;
    id?: string;
    importance?: string;
    lastModifiedDateTime?: Date;
    locale?: string;
    mentions?: IMessageMention[];
    messageType?: string;
    policyViolation?: any;
    reactions?;
    replyToId?: any;
    subject?: string;
    summary?: any;
}

export interface IMessageAttachment {
    content?: string;
    contentType?: string;
    contentUrl?: string;
    id?: string;
    name?: string;
    thumbnailUrl?: string;
}

export interface IMessageBody {
    content?: string;
    contentType?: string;
}

export interface IMessageFrom {
    application?: IMessageApplication;
    conversation?: any;
    device?: any;
    user?: IMessageUser;
}

export interface IMessageApplication {
    applicationIdentityType?: string;
    displayName?: string;
    id?: string;
}

export interface IMessageUser {
    displayName?: string;
    id?: string;
    userIdentityType?: string;
}

export interface IMessageMention {
    id?: number;
    mentionText?: string;
    mentioned?: IMessageFrom;
}

export interface IMessageReaction {
    createdDateTime?: Date;
    reactionType?: string;
    user?: IMessageFrom;
}

export interface IAdaptiveCard {
    isSubtle?: string;
    size?: string;
    spacing?: string;
    text?: string;
    type?: string;
    wrap?: boolean;
    items?: IAdaptiveCard[];
    style?: string;
    id?: string;
    choices?: [];
}

export class MessageConstants {
    public static readonly ContentTypeAdaptive: string = 'application/vnd.microsoft.card.adaptive';
    public static readonly ContentTypeHero: string = 'application/vnd.microsoft.card.hero';
    public static readonly AdaptiveCardTextBlock: string = 'TextBlock';
    public static readonly AdaptiveCardContainer: string = 'Container';
    public static readonly AdaptiveCardChoiceSet: string = 'InputChoiceSet';
}
