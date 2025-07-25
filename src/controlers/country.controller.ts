import {NextFunction, Request, Response} from 'express';
import countryService from 'services/country.service';
import {CountryInfo} from 'types/countryInfo.type';
import {FetchResponse} from 'types/fetchResponse.type';
import {AppError} from 'utils/appErrors';
import {catchError} from 'utils/catchError';

class CountryController {
  public getCountries = catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const countriesResponse: FetchResponse<CountryInfo[]> =
        await countryService.getAllCountries();

      if (countriesResponse.error) {
        return next(new AppError('External API error', countriesResponse.error));
      }

      res.status(200).json({
        status: 'success',
        results: countriesResponse.data!.length,
        data: {countries: countriesResponse.data}
      });
    }
  );

  public getCountrieInfo = catchError(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const countryInfoResponse = await countryService.getCountryInfo(req.params.code);

      if (countryInfoResponse.error) {
        return next(new AppError('External API error', countryInfoResponse.error));
      }

      res.status(200).json({
        status: 'success',
        data: {countryInfo: countryInfoResponse.data}
      });
    }
  );
}

const countryController = new CountryController();

export default countryController;
