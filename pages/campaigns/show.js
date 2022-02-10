/*
Business Source License 1.1

License text copyright (c) 2017 MariaDB Corporation Ab, All Rights Reserved.
"Business Source License" is a trademark of MariaDB Corporation Ab.

-----------------------------------------------------------------------------

Parameters

Licensor:             DATACURRENCY SERVICOS DIGITAIS LTDA - CNPJ 41950795000186

Licensed Work:        Destarter Platform(this smartContract) 
                      The Licensed Work is (c) 2022 DATACURRENCY SERVICOS DIGITAIS LTDA

Additional Use Grant: Any uses listed and defined at
                      Destarter.io

Change Date:           2030-04-01 

Change License:       GNU General Public License v2.0 or later

-----------------------------------------------------------------------------

Terms

The Licensor hereby grants you the right to copy, modify, create derivative
works, redistribute, and make non-production use of the Licensed Work. The
Licensor may make an Additional Use Grant, above, permitting limited
production use.

Effective on the Change Date, or the fourth anniversary of the first publicly
available distribution of a specific version of the Licensed Work under this
License, whichever comes first, the Licensor hereby grants you rights under
the terms of the Change License, and the rights granted in the paragraph
above terminate.

If your use of the Licensed Work does not comply with the requirements
currently in effect as described in this License, you must purchase a
commercial license from the Licensor, its affiliated entities, or authorized
resellers, or you must refrain from using the Licensed Work.

All copies of the original and modified Licensed Work, and derivative works
of the Licensed Work, are subject to this License. This License applies
separately for each version of the Licensed Work and the Change Date may vary
for each version of the Licensed Work released by Licensor.

You must conspicuously display this License on each original or modified copy
of the Licensed Work. If you receive the Licensed Work in original or
modified form from a third party, the terms and conditions set forth in this
License apply to your use of that work.

Any use of the Licensed Work in violation of this License will automatically
terminate your rights under this License for the current and all other
versions of the Licensed Work.

This License does not grant you any right in any trademark or logo of
Licensor or its affiliates (provided that you may use a trademark or logo of
Licensor as expressly required by this License).

TO THE EXTENT PERMITTED BY APPLICABLE LAW, THE LICENSED WORK IS PROVIDED ON
AN "AS IS" BASIS. LICENSOR HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS,
EXPRESS OR IMPLIED, INCLUDING (WITHOUT LIMITATION) WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND
TITLE.

MariaDB hereby grants you permission to use this License’s text to license
your works, and to refer to it using the trademark "Business Source License",
as long as you comply with the Covenants of Licensor below.

-----------------------------------------------------------------------------

Covenants of Licensor

In consideration of the right to use this License’s text and the "Business
Source License" name and trademark, Licensor covenants to MariaDB, and to all
other recipients of the licensed work to be provided by Licensor:

1. To specify as the Change License the GPL Version 2.0 or any later version,
   or a license that is compatible with GPL Version 2.0 or a later version,
   where "compatible" means that software provided under the Change License can
   be included in a program with software provided under GPL Version 2.0 or a
   later version. Licensor may specify additional Change Licenses without
   limitation.

2. To either: (a) specify an additional grant of rights to use that does not
   impose any additional restriction on the right granted in this License, as
   the Additional Use Grant; or (b) insert the text "None".

3. To specify a Change Date.

4. Not to modify this License in any other way.

-----------------------------------------------------------------------------

Notice

The Business Source License (this document, or the "License") is not an Open
Source license. However, the Licensed Work will eventually be made available
under an Open Source License, as stated in this License.

*/


import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    
    // importante , o endereço das campanhas é pego de forma dinâmica
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Endereço do Manager',
        description:
          'O manager criou este projeto e pode criar requests para usar as contribuições',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Contribuição mínima (wei)',
        description:
          'Você deve contribuir pelo menos com essa quantidade de Wei para se tornar um approver'
      },
      {
        header: requestsCount,
        meta: 'Número de Requests',
        description:
          'Um request é um pedido para usar o dinheiro do contrato. Requests precisam ser aprovados pelos approvers'
      },
      {
        header: approversCount,
        meta: 'Número de Approvers',
        description:
          'Número de pessoas que já contribuíram para este projeto'
      },
     
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: ' Balance (BNB)',
        description:
          'O balance é quanto este projeto já possui para investir.'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Projetos</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary> Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
