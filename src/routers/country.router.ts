import countryController from 'controlers/country.controller';
import Router from 'express';

const countryRouter = Router();

countryRouter.get('/', countryController.getCountries);
countryRouter.get('/:code', countryController.getCountrieInfo);

export default countryRouter;
