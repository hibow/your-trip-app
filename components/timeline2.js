import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import data from '../db/data';
import Typography from '@material-ui/core/Typography';


// const EXAMPLE = [
//   {
//     data: "2014-03-22",
//     status: "status",
//     statusB: "Ready for Dev",
//     statusE: "In Progress",
//     country: "UK",
//     city: 'London',
//     photos:[
//       "https://images.unsplash.com/photo-1519879110616-349b57f8cd11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80"
//     ],
//     title: 'tower',
//     summary: 'nicenicenicenice!!'
//   },
//   {
//     data: "2016-12-20",
//     status: "status",
//     statusB: "In Progress",
//     statusE: "Done",
//     country: "Egypt",
//     city: 'Carlo',
//     title: 'Pryrimid',
//     Summary: 'it is a sunny day...'
//   },
//   {
//     data: "2018-07-30",
//     status: "status",
//     statusB: "In Progress",
//     statusE: "Done",
//     country: "Italy",
//     city: 'Rome',
//     title: 'Colloson',
//     Summary: 'that was wonderful..'
//   }
// ];

//sort date

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
