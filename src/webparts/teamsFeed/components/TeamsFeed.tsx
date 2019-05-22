import * as React from 'react';
import styles from './TeamsFeed.module.scss';
import { ITeamsFeedProps } from './ITeamsFeedProps';
import { ITeamsService, TeamsServiceFlow } from '../../../services';
import ITeamsFeedState from './ITeamsFeedState';
import { IMessageModel } from '../../../models';
import { Message } from './message';

export default class TeamsFeed extends React.Component<ITeamsFeedProps, ITeamsFeedState> {

  constructor(props: ITeamsFeedProps) {
    super(props);
    this.state = {
      messages: []
    };
  }

  public async componentDidMount() {
    let service: ITeamsService = new TeamsServiceFlow(this.props.flowUrl);
    let messages: IMessageModel[] = await service.getMessages(this.props.teamId, this.props.channelId);
    this.setState({
      messages: messages
    });
  }

  public render(): React.ReactElement<ITeamsFeedProps> {
    return (
      <div className={ styles.teamsFeed }>
        <div className={ styles.container }>
          {this.renderMessages()}
        </div>
      </div>
    );
  }
  
  private renderMessages(): JSX.Element[] {
    return this.state.messages.map(m => <Message key={m.id} message={m} channelId={this.props.channelId}></Message>);
  }

}
