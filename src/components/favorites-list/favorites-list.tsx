import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorite-process/selectors';
import { getOffers } from '../../store/offer-process/selectors';
import CityCard from '../city-card/city-card';

function FavoritesList(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const favorites = useAppSelector(getFavorites);
  const favoriteOffers = offers.filter((offer) => favorites.includes(offer.id));
  const favoriteOffersCitiesSet = new Set(favoriteOffers.map((of) => of.city.name));
  const favoriteOffersCities = Array.from(favoriteOffersCitiesSet);
  return (
    <ul className="favorites__list">
      {favoriteOffersCities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers.filter((of) => of.city.name === city).map((offer) =>
              <CityCard key={offer.id} offer={offer} cardType='favorite' />
            )}
          </div>
        </li>
      ))}

    </ul>
  );
}

export default FavoritesList;
