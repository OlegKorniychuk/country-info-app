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
        return next(new AppError('External API error', 500));
      }

      res.status(200).json({
        status: 'success',
        results: countriesResponse.data!.length,
        data: {countries: countriesResponse.data}
      });
    }
  );
}

const countryController = new CountryController();

export default countryController;
