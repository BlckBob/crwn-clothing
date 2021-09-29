import CollectionPreview from '../../components/collection-preview/collection-preview';
import SHOP_DATA from './shop.data';

const ShopPage = () => {
  const state = {
    collections: SHOP_DATA,
  };

  return (
    <div className='shop-page'>
      {state.collections.map(({ id, ...otherSectionProps }) => (
        <CollectionPreview key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default ShopPage;
