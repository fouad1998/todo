import * as React from 'react'
import * as d3 from 'd3'
import { Work } from '../interfaces'
import { reformate, days, today, DateFr } from '../utility'

interface props {
  working: Map<string, Map<number, Work>>
}
interface state {
  selection: d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null
  selectedDay: string
}

class TodayReport extends React.Component<props, state> {
  private ref: React.RefObject<SVGSVGElement>
  private working: Map<string, Map<number, Work>>
  private dataPlot: Array<Work>
  private width: number
  private height: number
  private data: Map<number, Work> | null
  private selection: d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null
  private update: number

  constructor(props: props) {
    super(props)
    this.state = {
      selectedDay: today(),
      selection: null,
    }
    this.ref = React.createRef<SVGSVGElement>()
    this.working = this.props.working
    this.dataPlot = new Array<Work>()
    this.width = 330
    this.height = 250
    this.data = null
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
    let max = 0
    const height = this.height
    const width = this.width
    this.dataPlot = []
    if (this.data) {
      // IF WE HAVE THE REQUIRED DATA
      this.data.forEach((value: Work, key: number) => {
        // TRANSFORM MAP TO SIMPLE ARRAY
        this.dataPlot.push(value)
        if (value.time > max) {
          max = value.time
        }
      })
      // CREATE SCALE FUNCTION
      const y = d3
        .scaleLinear()
        .domain([0, max + 200])
        .range([0, height])
      // SVG SELECTOR
      const SELECTION = this.state.selection
      SELECTION && SELECTION.html('')
      if (!SELECTION) {
        this.setState({ selection: d3.select(this.ref.current) })
      } else {
        // USABLE WIDTH
        const widthUsedDraw = width - 10

        // DRAW GRAPHIC
        const GRAPHIC = SELECTION.append('g')
        GRAPHIC.selectAll('rect')
          .data(this.dataPlot)
          .enter()
          .append('rect')
          .attr('width', 6)
          .attr('rx', 2)
          .attr('ry', 2)
          .attr('x', (_: Work, i: number) => _.hour * (widthUsedDraw / 24) + 2)
          .attr('height', (d: Work) => y(d.time))
          .attr('y', (d: Work) => height - 20 - y(d.time))

          .attr('fill', (_: Work, i: number) =>
            i === 0 ? '#007bff' : this.dataPlot[i - 1].time > _.time ? 'red' : 'green'
          )
          .on('mouseover', (d: Work, i: number) => {
            const CONSTWIDTH = (d.hour * widthUsedDraw) / 24
            const CONSTHEIGHT = height - 60 - y(d.time)
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
              `${d.time / 60 > 2 ? (d.time / 60).toFixed(0) + ' MINUTES' : d.time + ' SECONDS'}`
            )
              .attr('x', TEXTPOSITIONX)
              .attr('y', TEXTPOSITIONY + 10)

            RECTSHOWDETAILS.attr('x', RECTPOSITIONX)
              .attr('y', RECTPOSITIONY)
              .attr(
                'fill',
                i === 0 ? '#007bff' : this.dataPlot[i - 1].time > d.time ? 'red' : 'green'
              )
            DETAILS.attr('display', 'block')
          })
          .on('mouseout', () => {
            DETAILS.attr('display', 'none')
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

        // DRAW THE AXES
        const AXES = SELECTION.append('g')
        AXES.selectAll('text')
          .data(new Array(25).fill(0))
          .enter()
          .append('text')
          .attr('x', (_: number, i: number) =>
            i < 24 ? i * (widthUsedDraw / 24) + 3 : i * (widthUsedDraw / 24) - 22
          )
          .attr('y', height)
          .attr('fill', 'blue')
          .style('font-size', '16')
          .style('font-family', 'm')
          .text((_: number, i: number) => (i % 6 === 0 ? (i < 24 ? i : i + '(h)') : ''))
        AXES.selectAll('circle')
          .data(new Array(24 * 4 + 1).fill(0))
          .enter()
          .append('circle')
          .attr('cx', (_: number, i) => i * (widthUsedDraw / (24 * 4)) + 5)
          .attr('cy', height - 20)
          .attr('r', (_: number, i: number) => (i % 24 === 0 ? 3 : 1))
          .attr('stroke', '#2228')
          .attr('stroke-width', '1')
          .selectAll('rect')
      }
    }
  }

  componentDidMount() {
    this._draw()
  }

  componentDidUpdate() {
    this._draw()
  }

  render() {
    this.data = this.working.get(this.state.selectedDay) as Map<number, Work>
    const Nav: React.FC<{}> = () => (
      <div className="row">
        <div className="col-12 input-group my-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Date
            </label>
          </div>
          <select
            className="custom-select"
            onChange={e => {
              this.setState({ selectedDay: e.currentTarget.value })
            }}
            defaultValue={this.state.selectedDay}>
            {new Array(8).fill(0).map((_: number, i: number) => {
              const LASTDATE = new Date().getDate() - i
              const DATE = new Date(new Date().setDate(LASTDATE))
              const REFORMATEDDATE = `${reformate(DATE.getDate())}/${reformate(
                DATE.getMonth() + 1
              )}/${DATE.getFullYear()}`
              const DAY = days[DATE.getDay()]
              return (
                <option key={i} value={REFORMATEDDATE}>
                  {DAY}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    )
    const INDEX = DateFr(this.state.selectedDay).getDay()
    return (
      <div className="col-12 col-md-6">
        <div className="row">
          <h4 className="text-info p-2 pl-3 col-12">Days Reporter ({days[INDEX]})</h4>
          <svg
            className="col-12"
            ref={this.ref}
            style={{ display: this.data ? 'block' : 'none' }}
            viewBox={`0 0 ${this.width} ${this.height}`}></svg>
          {!this.data && (
            <h4
              className="text-center col-12 d-flex justify-content-center align-items-center text-danger"
              style={{ height: this.height }}>
              No data
            </h4>
          )}
          <div className="col-12">
            <Nav />
          </div>
        </div>
      </div>
    )
  }
}
export default TodayReport
