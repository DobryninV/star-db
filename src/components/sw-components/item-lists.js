import {WithData, withSwapiService, withChildFunction, compose} from '../hoc-helper';
import ItemList from '../item-list';

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>;

const mapPersonMethodToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  }
}
const mapPlanetMethodToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  }
}
const mapStarshipMethodToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  }
}
 
const PersonList = compose(
  withSwapiService(mapPersonMethodToProps),
  WithData,
  withChildFunction(renderName)
)(ItemList)


const PlanetList = compose(
  withSwapiService(mapPlanetMethodToProps),
  WithData,
  withChildFunction(renderName)
)(ItemList)


const StarshipList = compose(
  withSwapiService(mapStarshipMethodToProps),
  WithData,
  withChildFunction(renderModelAndName)
)(ItemList)

export { 
  PersonList,
  PlanetList,
  StarshipList
}