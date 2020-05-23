import * as React from 'react'
import * as d3 from 'd3'
import { Job, Work } from '../interfaces'
import {
  days,
  reformate,
  countSeconds,
  RANGE,
  formateDate,
  greaterOrEqual,
  DateFr,
} from '../utility'

interface state {
  selection: d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null
  selectedWeek: number
}

interface props {
  jobs: Array<Job>
}

interface plotData {
  date: string
  seconds: number
  tasksNumber: number
}

class HoursPerDay extends React.Component<props, state> {
  private ref: React.RefObject<SVGSVGElement>
  private working: Array<Job>
  private dataPlot: Array<plotData>
  private width: number
  private height: number
  private selection: d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null
  private update: number

  constructor(props: props) {
    super(props)
    this.state = {
      selectedWeek: 0,
      selection: null,
    }
    this.ref = React.createRef<SVGSVGElement>()
    this.working = this.props.jobs
    this.dataPlot = new Array<plotData>()
    for (const item of this.working) {
      const index = this.dataPlot.findIndex(v => v.date === item.finishedDay)
      if (index === -1) {
        this.dataPlot.push({
          date: item.finishedDay,
          seconds: countSeconds(item.timeBegin),
          tasksNumber: 1,
        })
      } else {
        this.dataPlot[index].seconds += countSeconds(item.timeBegin)
        this.dataPlot[index].tasksNumber++
      }
    }
    this.width = 330
    this.height = 250
    this.update = 1
    this.selection = null
  }

  shouldComponentUpdate(nextProps: props, nextState: state) {
    if (nextState !== this.state) {
      return true
    } else if (this.update % 120 === 0) {
      this.update = 1
      return true
    } else {
      this.update++
      return false
    }
  }

  _draw() {
    const height = this.height
    const width = this.width
    const widthUsedDraw = width - 10
    const HEIGHTUSEDDRAW = height - 20
    const max = d3.max(this.dataPlot, v => {
      const lastDate = new Date().getDate() - 7
      const date = new Date(new Date().setDate(lastDate))
      if (greaterOrEqual(DateFr(v.date), date)) {
        return v.seconds
      } else {
        return 0
      }
    }) as number
    const SELECTION = this.state.selection
    // Y SCALE
    const y = d3
      .scaleLinear()
      .domain([0, max + 100])
      .range([0, HEIGHTUSEDDRAW])

    if (!SELECTION) {
      this.setState({ selection: d3.select(this.ref.current) })
    } else {
      console.log('max ', max)
      SELECTION.html('')

      // AXES
      const axes = SELECTION.append('g')
      axes
        .selectAll('text')
        .data(new Array(8).fill(0))
        .enter()
        .append('text')
        .attr('x', (_: number, i: number) =>
          i < 7 ? i * (widthUsedDraw / 7) + 3 : i * (widthUsedDraw / 7) - 15
        )
        .attr('y', height)
        .attr('fill', 'blue')
        .style('font-size', '16')
        .style('font-family', 'm')
        .text((_: number, i: number) => {
          const date = new Date(new Date().setDate(new Date().getDate() - 7 + i))
          return days[date.getDay()].substr(0, 3)
        })
      axes
        .selectAll('circle')
        .data(new Array(7 * 15 + 1).fill(0))
        .enter()
        .append('circle')
        .attr('stroke', '#2228')
        .attr('stroke-width', '0')
        .attr('cx', (_: number, i: number) => i * (widthUsedDraw / (7 * 15)) + 5)
        .attr('cy', height - 20)
        .attr('r', (_: number, i: number) => (i % 15 === 0 ? 3 : 1))

      // PLOT
      const linesGroup = SELECTION.append('g')
      linesGroup
        .selectAll('circle')
        .data(new Array(8).fill(0))
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr('fill', 'green')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('cx', (_: number, i: number) => i * (widthUsedDraw / 7) + 5)
        .attr('cy', (_: number, i: number) => {
          const lastDate = new Date().getDate() - 7 * (this.state.selectedWeek + 1) + i
          const date = new Date(new Date().setDate(lastDate))
          const reformatedDate = formateDate(date)
          const index = this.dataPlot.findIndex((v: plotData) => v.date === reformatedDate)
          if (index !== -1) {
            console.log(this.dataPlot[index].seconds, y(this.dataPlot[index].seconds))
            return HEIGHTUSEDDRAW - y(this.dataPlot[index].seconds)
          } else {
            return HEIGHTUSEDDRAW
          }
        })
        .on('mouseover', (d: number, i: number) => {
          const lastDate = new Date().getDate() - 7 * (this.state.selectedWeek + 1) + i
          const date = new Date(new Date().setDate(lastDate))
          const reformatedDate = formateDate(date)
          const index = this.dataPlot.findIndex((v: plotData) => v.date === reformatedDate)
          const ITEM = this.dataPlot[index] || { seconds: 0 }
          //
          const CONSTWIDTH = (i * widthUsedDraw) / 7
          const CONSTHEIGHT = height - 60 - y(ITEM.seconds)
          const TEXTPOSITIONX =
            CONSTWIDTH < 45 ? 45 : CONSTWIDTH > this.width - 45 ? this.width - 45 : CONSTWIDTH
          const TEXTPOSITIONY = CONSTHEIGHT - 10 > 0 ? CONSTHEIGHT - 10 : 10
          const RECTPOSITIONX =
            CONSTWIDTH - 45 < 0
              ? 0
              : CONSTWIDTH - 45 > this.width - 90
              ? this.width - 90
              : CONSTWIDTH - 45
          const RECTPOSITIONY = CONSTHEIGHT - 20 > 0 ? CONSTHEIGHT - 20 : 0
          SHOWDETAILTS.text(
            `${
              ITEM.seconds / 60 > 2
                ? (ITEM.seconds / 60).toFixed(0) + ' MINUTES'
                : ITEM.seconds + ' SECONDS'
            }`
          )
            .attr('x', TEXTPOSITIONX)
            .attr('y', TEXTPOSITIONY + 10)

          RECTSHOWDETAILS.attr('x', RECTPOSITIONX).attr('y', RECTPOSITIONY).attr(
            'fill',

            '#007bff'
          )
          DETAILS.attr('display', 'block')
        })
        .on('mouseout', () => {
          DETAILS.attr('display', 'none')
        })
      // FILL
      linesGroup
        .selectAll('line')
        .data(new Array(7).fill(0))
        .enter()
        .append('line')
        .attr('stroke', 'green')
        .attr('x1', (_: number, i: number) => i * (widthUsedDraw / 7) + 5)
        .attr('x2', (_: number, i: number) => (i + 1) * (widthUsedDraw / 7) + 5)
        .attr('y1', (_: number, i: number) => {
          const lastDate = new Date().getDate() - 7 * (this.state.selectedWeek + 1) + i
          const date = new Date(new Date().setDate(lastDate))
          const reformatedDate = formateDate(date)
          const index = this.dataPlot.findIndex((v: plotData) => v.date === reformatedDate)
          if (index !== -1) {
            return HEIGHTUSEDDRAW - y(this.dataPlot[index].seconds)
          } else {
            return HEIGHTUSEDDRAW
          }
        })
        .attr('y2', (_: number, i: number) => {
          const lastDate = new Date().getDate() - 7 * (this.state.selectedWeek + 1) + (i + 1)
          const date = new Date(new Date().setDate(lastDate))
          const reformatedDate = formateDate(date)
          const index = this.dataPlot.findIndex((v: plotData) => v.date === reformatedDate)
          if (index !== -1) {
            return HEIGHTUSEDDRAW - y(this.dataPlot[index].seconds)
          } else {
            return HEIGHTUSEDDRAW
          }
        })

      // SHOW DETAILS ELEMENT
      const DETAILS = SELECTION.append('g')
        .attr('display', 'none')
        .on('mouseover', function () {
          this.setAttribute('display', 'block')
        })
        .on('mouseout', function () {
          this.setAttribute('display', 'none')
        })

      const RECTSHOWDETAILS = DETAILS.append('rect')
        .attr('width', 90)
        .attr('height', 40)
        .attr('fill', '#007bff')
        .attr('rx', 5)
        .attr('rx', 5)

      const SHOWDETAILTS = DETAILS.append('text')
        .attr('width', 90)
        .attr('height', 20)
        .attr('font-size', 12)
        .style('text-anchor', 'middle')
    }
  }

  componentDidMount() {
    this._draw()
  }

  componentDidUpdate() {
    this._draw()
  }

  render() {
    const Nav: React.FC<{}> = () => (
      <div className="row">
        <div className="col-12 input-group my-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Week
            </label>
          </div>
          <select
            className="custom-select"
            onChange={e => {
              this.setState({ selectedWeek: parseInt(e.currentTarget.value) })
            }}
            defaultValue={this.state.selectedWeek}>
            {new Array(4).fill(0).map((_: number, i: number) => {
              return (
                <option key={i} value={i}>
                  {RANGE[i]} Week
                </option>
              )
            })}
          </select>
        </div>
      </div>
    )
    return (
      <div className="col-12 col-md-6">
        <div className="row">
          <h4 className="text-info p-2 pl-3 col-12">
            Weeks Reporter ({RANGE[this.state.selectedWeek]} Week)
          </h4>
          <svg className="col-12" ref={this.ref} viewBox={`0 0 ${this.width} ${this.height}`}></svg>
          <div className="col-12">
            <Nav />
          </div>
        </div>
      </div>
    )
  }
}
export default HoursPerDay
