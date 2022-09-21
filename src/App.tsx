import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.min.css";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  TimePicker,
  Typography,
} from "antd";
import moment, { Moment } from "moment";
import useInterval from "./hooks/useInterval";

function checkTime(timeToCheck: Moment) {
  const checkHour = timeToCheck.hour();
  const checkMin = timeToCheck.minute();

  const currentHour = moment().hour();
  const currentMinute = moment().minute();
  if (checkHour === currentHour && checkMin === currentMinute) {
    return true;
  }
  return false;
}

// DZBB HAHA I will use this to wake me up in the morning.
const defaultEmbedId = "e3VpYMhwE3c";

function App() {
  const [alarmTime, setAlarmTime] = useState<Moment>();
  const [embedId, setEmbedId] = useState<string>(defaultEmbedId);
  const [play, setPlayState] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<Moment>(moment());
  const [timerResponse, setTimerResponse] = useState<boolean>(false);

  const embedSrc = embedId
    ? `https://www.youtube.com/embed/${embedId}?autoplay=1`
    : undefined;

  useInterval(() => {
    // Your custom logic here
    const isItTime = alarmTime && checkTime(alarmTime);
    if (isItTime) {
      setPlayState(true);
      setTimerResponse(true);
    }
    setTimerResponse(false);
    setDisplayTime(moment());
  }, 1000);

  return (
    <Layout className="App" style={{ height: "100%" }}>
      <Layout.Content>
        <Row>
          <Col span={8} style={{ padding: "1rem" }}>
            <Card>
              <Form>
                <Form.Item name="Time" label="Wake me up at:">
                  <TimePicker
                    format={"hh:mm A"}
                    onChange={(value) => {
                      if (value) setAlarmTime(value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="embedId"
                  label="Youtube Embed ID"
                  extra="I will play this when the time comes."
                  initialValue={defaultEmbedId}
                >
                  <Input
                    onChange={(event) => {
                      if (event) setEmbedId(event.target.value);
                    }}
                  />
                </Form.Item>
              </Form>
              <Button onClick={() => setPlayState(true)}>Test Play ??</Button>
              <Button
                onClick={() => {
                  setPlayState(false);
                  setAlarmTime(undefined);
                }}
              >
                Shaddup
              </Button>
              <Typography.Title>I will wake you up at</Typography.Title>
              <Typography.Title level={2}>
                {moment(alarmTime).format("hh:mm A")}
              </Typography.Title>
            </Card>
          </Col>
          <Col span={16}>
            <Typography.Title level={3}>is it time?</Typography.Title>
            <Typography.Title level={4}>
              it is currently {displayTime.format("hh:mm A")}
            </Typography.Title>
            {play && (
              <iframe
                width="560"
                height="315"
                src={play ? embedSrc : undefined}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default App;
