import React from "react";
import QRCode from "qrcode.react";
import Style from "../styles/qr.css";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import RefreshIndicator from "material-ui/RefreshIndicator";
import {red500} from "material-ui/styles/colors";
import axios from "axios";

const WAIT = 'wait';
const APPROVED = 'approved';
const REFUSED = 'refused';

export default class RQPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: this.props.params["uuid"],
      pageState: WAIT
    }
  }

  poll = () => {
    axios.request({
      method: 'get',
      url: `/api/v1/requirers/${this.state.uuid}/`,
      responseType: 'json',
      auth: {
        username: 'admin',
        password: 'password123'
      }
    }).then((response) => {
      if (response.data.is_verified) {
        let allowed = response.data.is_allowed;
        if (allowed) {
          let token = response.data.access_token;
          this.setState({pageState: APPROVED, token: token});
        } else {
          this.setState({pageState: REFUSED});
        }
      } else {
        setTimeout(this.poll, 5000);
      }
    });
  };

  renderContent = () => {
    if (this.state.pageState == WAIT) {
      return this.renderWaitPage();
    }

    if (this.state.pageState == REFUSED) {
      return this.renderRefusedPage();
    }

    if (this.state.pageState == APPROVED) {
      return this.renderApprovedPage();
    }

    return this.renderErrorPage();
  };

  getPosition = () => {
    if (screen.width < 380) {
      return {size: 80, left: 125};
    } else if (screen.width < 415) {
      return {size: 80, left: 120};
    }

    return {size: 100, left: 150};
  };

  renderWaitPage = () => {
    this.poll();
    return <Card>
      <CardHeader title="" subtitle="">
        <RefreshIndicator size={this.getPosition().size} left={this.getPosition().left} top={20} status="loading"/>
      </CardHeader>
      <CardTitle title="l" subtitle=""/>
      <CardText>
        <p>Waiting for the admin's confirmation</p>
        <p className={Style.warning}>Do Not close this page</p>
      </CardText>
    </Card>
  };

  renderRefusedPage = () => {
    return <Card>
      <CardHeader title="" subtitle="">
      </CardHeader>
      <CardTitle titleColor={red500} title="Sorry" subtitle=""/>
      <CardText>
        <p>Admin refused your application.</p>
      </CardText>
    </Card>
  };

  renderApprovedPage = () => {
    return <Card>
      <CardHeader title="" subtitle=""/>
      <QRCode value={this.state.token}/>
      <CardTitle title="QRCode" subtitle=""/>
      <CardText>
        We are a software company and a community of passionate,
        purpose-led individuals. We think disruptively to deliver technology
        to address our clients' toughest challenges, all while seeking to revolutionize
        the IT industry and create positive social change.
      </CardText>
    </Card>
  };

  renderErrorPage = () => {
    return <Card>
      <CardHeader title="" subtitle=""/>
      <CardTitle title="Ops...." subtitle=""/>
      <CardText>
        Unknown error happen, please try again.
      </CardText>
    </Card>
  };

  render() {
    return (
      <div className={Style.outer}>
        <div className={Style.middle}>
          <div className={Style.inner}>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}
