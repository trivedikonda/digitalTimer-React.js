// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timeElapsedInSecs: 0,
}

class DigitalTimer extends Component {
  state = initialState

  onClickPlayPauseBtn = () => {
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickMinusSign = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onClickPlusSign = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onClickResetBtn = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSecs = () => {
    const {timerLimitInMinutes, timeElapsedInSecs} = this.state
    const isTimerCompleted = timeElapsedInSecs === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSecs: prevState.timeElapsedInSecs + 1,
      }))
    }
  }

  onClickPlayPauseBtn = () => {
    const {isTimerRunning, timeElapsedInSecs, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSecs === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSecs: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSecs, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSecs} = this.state
    // console.log(timerLimitInMinutes)
    // console.log(timeElapsedInSecs)
    const totalRemainingSecs = timerLimitInMinutes * 60 - timeElapsedInSecs
    // console.log(totalRemainingSecs)
    const minutes = Math.floor(totalRemainingSecs / 60)
    // console.log(minutes)
    const seconds = Math.floor(totalRemainingSecs % 60)
    // console.log(seconds)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSecs = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSecs}`
  }

  render() {
    const {isTimerRunning, timeElapsedInSecs, timerLimitInMinutes} = this.state
    const buttonsDisabled = timeElapsedInSecs > 0

    const timerStatus = isTimerRunning ? 'Pause' : 'Start'
    const imgAltTxt = isTimerRunning ? 'pause icon' : 'play icon'
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="app-container">
        <div className="container">
          <h1 className="heading">Digital Timer</h1>
          <div className="time-container">
            <div className="left-container">
              <div className="show-time-container">
                <h1 className="timer">{this.getElapsedSecsInTimeFormat()}</h1>
                <p className="timer-status-txt">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="right-container">
              <div className="start-reset">
                <div>
                  <button
                    className="play-pause"
                    type="button"
                    onClick={this.onClickPlayPauseBtn}
                  >
                    <img
                      width={20}
                      height={20}
                      alt={imgAltTxt}
                      src={imageUrl}
                    />

                    <p className="btn-txt">{timerStatus}</p>
                  </button>
                </div>

                <div className="reset">
                  <button
                    className="button"
                    type="button"
                    onClick={this.onClickResetBtn}
                  >
                    <img
                      width={20}
                      height={20}
                      alt="reset icon"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    />
                  </button>
                  <p className="btn-txt">Reset</p>
                </div>
              </div>

              <div>
                <p className="para">Set Timer Limit</p>
                <div className="plus-minus-container">
                  <button
                    disabled={buttonsDisabled}
                    type="button"
                    className="sign"
                    onClick={this.onClickMinusSign}
                  >
                    -
                  </button>
                  <p className="toggle-time">{timerLimitInMinutes}</p>
                  <button
                    disabled={buttonsDisabled}
                    type="button"
                    className="sign"
                    onClick={this.onClickPlusSign}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
