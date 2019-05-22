import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'TeamsFeedWebPartStrings';
import TeamsFeed from './components/TeamsFeed';
import { ITeamsFeedProps } from './components/ITeamsFeedProps';

export interface ITeamsFeedWebPartProps {
  channelId: string;
  teamId: string;
  flowUrl: string;
}

export default class TeamsFeedWebPart extends BaseClientSideWebPart<ITeamsFeedWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITeamsFeedProps > = React.createElement(
      TeamsFeed,
      {
        channelId: this.properties.channelId,
        teamId: this.properties.teamId,
        flowUrl: this.properties.flowUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('teamId', {
                  label: strings.TeamId
                }),
                PropertyPaneTextField('channelId', {
                  label: strings.ChannelId
                }),
                PropertyPaneTextField('flowUrl', {
                  label: strings.FlowUrl
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
