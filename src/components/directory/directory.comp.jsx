import MenuItem from '../menu-item/menu-item.comp';

import './directory.styles.scss';

import SECTIONS_DATA from './sections.data';

const Directory = () => {
  const state = {
    sections: SECTIONS_DATA,
  };

  return (
    <div className='directory-menu'>
      {state.sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
