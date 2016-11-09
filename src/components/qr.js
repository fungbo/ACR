import React from "react";
import QRCode from "qrcode.react";
import Style from "../styles/qr.css";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import RefreshIndicator from "material-ui/RefreshIndicator";

export default class RQPage extends React.Component {

  renderContent = () => {
    if (this.props.params["code"] == 'unknown') {
      return <Card>
          <CardHeader title="" subtitle="">
            <RefreshIndicator size={100} left={150} top={20} status="loading"/>
          </CardHeader>
          <CardTitle title="loading" subtitle=""/>
          <CardText>
            <p>Waiting for the admin's confirmation</p>
            <p className={Style.warning}>Do Not close this page</p>
          </CardText>
        </Card>
    } else {
      return <Card>
        <CardHeader title="" subtitle=""/>
        <QRCode value={this.props.params["code"]}/>
        <CardTitle title="QRCode" subtitle=""/>
        <CardText>
          We are a software company and a community of passionate,
          purpose-led individuals. We think disruptively to deliver technology
          to address our clients' toughest challenges, all while seeking to revolutionize
          the IT industry and create positive social change.
        </CardText>
      </Card>

    }
  };

  render() {
    console.log('code', this.props.params["code"]);
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
