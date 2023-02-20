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

class Home extends Component {
  state = {category: categoriesList[0].id, list: [], isLoader: false}

  componentDidMount() {
    this.projectShowcase()
  }

  onChangeCategory = e => {
    this.setState({
      category: categoriesList.filter(
        each => each.displayText === e.target.value,
      ),
    })

    console.log(e.target.value)
  }

  projectShowcase = async () => {
    const {category} = this.state
    console.log(category)
    this.setState({isLoader: true})

    const url = `https://apis.ccbp.in/ps/projects?category=${category}`

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

      this.setState({list: fetchData, isLoader: false})
    }
  }

  loaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" height="50" width="30" color="blue" />
    </div>
  )

  projectView = () => {
    const {list} = this.state

    return (
      <div>
        {list.map(each => (
          <ProjectShowcase key={each.id} Details={each} />
        ))}
      </div>
    )
  }

  render() {
    const {isLoader} = this.state
    return (
      <div>
        <select name="category">
          {categoriesList.map(each => (
            <option
              key={each.id}
              value={each.displayText}
              onChange={this.onChangeCategory}
            >
              {each.displayText}
            </option>
          ))}
        </select>

        <div>{isLoader ? this.loaderView() : this.projectView()}</div>
      </div>
    )
  }
}

export default Home
