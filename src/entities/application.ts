/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {GrantType} from "./oauth";
import * as _ from "lodash";

export class ApplicationType {
  public name: string;
  public value: string;
  public description: string;
  public icon: string;
  public oauth?: any;
  public configuration: any;

  static SIMPLE: ApplicationType = new ApplicationType(
    'Simple', 'SIMPLE', 'A hands-free application. Using this type, you will be able to define the client_id by your own.',
    'pan_tool', undefined, {});

  static BROWSER: ApplicationType = new ApplicationType(
    'SPA', 'BROWSER', 'Angular, React, ...',
    'computer',
    {
      allowed_grant_types: [GrantType.AUTHORIZATION_CODE, GrantType.IMPLICIT],
      default_grant_types: [GrantType.IMPLICIT.type]
    },
    {
      oauth: {
        application_type: 'browser',
        grant_types: [],
        redirect_uris: []
      }
    });

  static WEB: ApplicationType = new ApplicationType(
    'Web', 'WEB', 'Java, .Net, ...',
    'language',
    {
      allowed_grant_types: [GrantType.AUTHORIZATION_CODE, GrantType.REFRESH_TOKEN, GrantType.IMPLICIT_HYBRID],
      mandatory_grant_types: [GrantType.AUTHORIZATION_CODE.type],
      default_grant_types: [GrantType.AUTHORIZATION_CODE.type]
    },
    {
      oauth: {
        application_type: 'web',
        grant_types: [],
        redirect_uris: []
      }
    });

  static NATIVE: ApplicationType = new ApplicationType(
    'Native', 'NATIVE', 'iOS, Android, ...',
    'phone_android',
    {
      allowed_grant_types: [GrantType.AUTHORIZATION_CODE, GrantType.REFRESH_TOKEN, GrantType.PASSWORD, GrantType.IMPLICIT_HYBRID],
      mandatory_grant_types: [GrantType.AUTHORIZATION_CODE.type],
      default_grant_types: [GrantType.AUTHORIZATION_CODE.type]
    },
    {
      oauth: {
        application_type: 'native',
        grant_types: [],
        redirect_uris: []
      }
    });

  static TYPES: ApplicationType[] = [ApplicationType.SIMPLE, ApplicationType.BROWSER, ApplicationType.WEB, ApplicationType.NATIVE];

  constructor(name: string, value: string, description: string, icon: string, oauth: any, configuration: any) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.icon = icon;
    this.oauth = oauth;
    this.configuration = configuration;
  }

  public isGrantTypeMandatory(grantType: GrantType): boolean {
    return this.oauth &&
      this.oauth.mandatory_grant_types &&
      _.indexOf(this.oauth.mandatory_grant_types, grantType.type) != -1;
  }
}

// Dynamic Client registration does not support backend-to-backend (client_credentials).
/*
const BACKEND_TO_BACKEND_TYPE: ApplicationType = {
  name: 'Machine to Machine',
  value: 'BACKEND_TO_BACKEND',
  description: 'Service to service',
  icon: 'share',
  oauth: true,
  configuration: {
    application_type: 'service',
    grant_types: ['client_credentials']
  }
};
*/
