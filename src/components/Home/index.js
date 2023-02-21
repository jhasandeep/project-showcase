import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectShowcase from '../ProjectShowcase'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    category: categoriesList[0].id,
    list: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.projectShowcase()
  }

  projectShowcase = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {category} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${category}`
    console.log(url)

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({list: fetchData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.projectShowcase()
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />

      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  loaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" height="50" width="30" color="blue" />
    </div>
  )

  projectView = () => {
    const {list} = this.state

    return (
      <ul>
        {list.map(each => (
          <ProjectShowcase key={each.id} Details={each} />
        ))}
      </ul>
    )
  }

  renderPageDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.projectView()

      case apiStatusConstants.failure:
        return this.failureView()

      case apiStatusConstants.inProgress:
        return this.loaderView()

      default:
        return null
    }
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value})
    this.projectShowcase()
  }

  render() {
    const {category} = this.state
    return (
      <div>
        <select onChange={this.onChangeCategory} value={category}>
          {categoriesList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>

        <div>{this.renderPageDetails()}</div>
      </div>
    )
  }
}

export default Home
