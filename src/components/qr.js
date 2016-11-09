import React from "react";
import QRCode from "qrcode.react";
import Style from "../styles/qr.css";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class RQPage extends React.Component {
  render() {
    return (
      <div className={Style.outer}>
        <div className={Style.middle}>
          <div className={Style.inner}>
            <Card>
              <CardHeader title="" subtitle=""/>
              <QRCode value={this.props.params["code"]}/>
              <CardTitle title="QRCode" subtitle="" />
              <CardText>
                We are a software company and a community of passionate,
                purpose-led individuals. We think disruptively to deliver technology
                to address our clients' toughest challenges, all while seeking to revolutionize
                the IT industry and create positive social change.
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}