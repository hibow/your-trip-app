import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import data from '../db/data';
import Typography from '@material-ui/core/Typography';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,
      prevIdx: -1
    };
  }

  //state = { value: 0, previous: 0 };

  render() {
    const {curIdx, prevIdx} = this.state;
    const curStatus = data[curIdx].city + ', ' + data[curIdx].country;
    const curTitle = data[curIdx].title;
    const curSum = data[curIdx].summary;
    // const prevStatus = prevIdx >= 0 ? data[prevIdx].statusB : '';

    return (
      <div>
        {/* Bounding box for the Timeline */}
<p>
{'\n'}
</p>
        <div
          style={{
            width: "100%",
            height: "100px",
            // margin: "10 auto",
            // marginTop: "200",
            fontSize: "15px"
          }}
        >
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
            index={this.state.curIdx}
            indexClick={index => {
              const curIdx = this.state.curIdx;
              this.setState({ curIdx: index, prevIdx: curIdx });
            }}
            values={data.map(x => x.time)}
          />
        </div>
        <div className="text-center">
        <Typography variant="h6" >
          {/* any arbitrary component can go here */}
          {curStatus}
          <div>
          {curTitle}
          </div>
          </Typography>
        </div>
      </div>
    );
  }
}
