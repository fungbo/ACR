import React from "react";
import Paper from "material-ui/Paper";
import Button from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {RadioButtonGroup, RadioButton} from "material-ui/RadioButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TimePicker from "material-ui/TimePicker";
import Style from "../styles/login.css";
import Logo from "../images/tw-logo.png";
import axios from "axios";
import {browserHistory} from "react-router";

const OTHER = '其他...';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNameValid: true,
      isTelValid: true,
      isReasonValid: true,
      isDetailValid: true,
      isStartTimeValid: true,
      isEndTimeValid: true
    }
  }

  inputName = (ev) => {
    let name = ev.target.value;

    if (name === '') {
      this.setState({isNameValid: false});
    } else {
      this.setState({isNameValid: true, name: name});
    }
  };

  inputTel = (ev) => {
    let tel = ev.target.value;

    if (this.isTelValid(tel)) {
      this.setState({tel: tel, isTelValid: true});
    } else {
      this.setState({isTelValid: false});
    }
  };

  selectReason = (event, index, value) => {
    if (value != 4) {
      this.setState({isDetailValid: true, detail: undefined});
    }
    this.setState({reason: value, isReasonValid: true});
  };

  inputReason = (ev) => {
    let detail = ev.target.value;

    if (detail === '') {
      this.setState({isDetailValid: false});
    } else {
      this.setState({isDetailValid: true, detail: detail});
    }
  };

  inputStartTime = (event, time) => {
    this.setState({startTime: time, isStartTimeValid: true});
  };

  inputEndTime = (event, time) => {
    if (time <= this.state.startTime) {
      this.setState({isEndTimeValid: false});
    } else {
      this.setState({endTime: time, isEndTimeValid: true});
    }
  };

  submit = () => {
    if (!this.checkParams()) {
      return;
    }

    console.log("submit");
    axios.request({
      method: 'post',
      url: '/api/v1/requirers/',
      data: {
        requirer_name: this.state.name,
        requirer_phone_number: this.state.tel,
        requirer_start: this.state.startTime,
        requirer_end: this.state.endTime,
        requirer_reason: this.state.reason == OTHER ? this.state.detail : this.state.reason,
      },
      responseType: 'json',
      auth: {
        username: 'admin',
        password: 'password123'
      }
    }).then((response) => {
      console.log('response', response);
      let data = 'q1w2e3';
      browserHistory.push(`/qr/${data}`);
    }).catch((error) => {
      console.log('error', error);
    });

    browserHistory.push(`/qr/unknown`);
  };

  getReasonClass = function () {
    if (this.state.reason == OTHER) {
      return '';
    }

    return Style.reason;
  };

  isTelValid = (tel) => {
    return this.isEmpty(tel) || this.isNumber(tel);
  };

  isEmpty = (n) => {
    return n === '';
  };

  isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  checkParams() {
    if (!this.state.name) {
      this.setState({isNameValid: false});
    }

    if (!this.state.tel) {
      this.setState({isTelValid: false});
    }

    if (!this.state.reason) {
      this.setState({isReasonValid: false});
    }

    if (!this.state.startTime) {
      this.setState({isStartTimeValid: false});
    }

    if (!this.state.endTime) {
      this.setState({isEndTimeValid: false});
    }

    return this.state.isNameValid && this.state.isTelValid && this.state.isReasonValid && this.state.isDetailValid
      && this.state.isStartTimeValid && this.state.isEndTimeValid;
  }

  render() {
    return (
      <div className={Style.outer}>
        <div className={Style.middle}>
          <Paper className={Style.inner} zDepth={3}>
            <img src={Logo}/>
            <TextField fullWidth={true} floatingLabelText="姓名" onChange={this.inputName}
                       errorText={`${this.state.isNameValid ? '' : '姓名不能为空'}`}/>

            <TextField fullWidth={true} floatingLabelText="电话" onChange={this.inputTel}
                       errorText={`${this.state.isTelValid ? '' : '电话号码不能为空或非数字'}`}/>

            <SelectField floatingLabelText="原因" value={this.state.reason} fullWidth={true} onChange={this.selectReason}
                         errorText={`${this.state.isReasonValid ? '' : '原因不能为空'}`}>
              <MenuItem value={'面试'} primaryText='面试'/>
              <MenuItem value={'送货'} primaryText='送货'/>
              <MenuItem value={'没事干'} primaryText='没事干'/>
              <MenuItem value={OTHER} primaryText={OTHER}/>
            </SelectField>

            <TextField className={this.getReasonClass()} fullWidth={true} floatingLabelText='到底啥事'
                       onChange={this.inputReason} errorText={`${this.state.isDetailValid ? '' : '原因不能为空'}`}/>

            <TimePicker hintText="开始时间" value={this.state.startTime} onChange={this.inputStartTime}
                        errorText={`${this.state.isStartTimeValid ? '' : '开始时间不能为空'}`}/>
            <TimePicker hintText="结束时间" value={this.state.endTime} onChange={this.inputEndTime}
                        errorText={`${this.state.isEndTimeValid ? '' : '结束时间不能为空或早于开始时间'}`}/>
            <Button className={Style.btn} primary={true} fullWidth={true} onClick={this.submit} label="提交">
              </Button>
          </Paper>
        </div>
      </div>
    )
  }
}
