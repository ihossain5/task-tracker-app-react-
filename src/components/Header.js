import PropTypes from 'prop-types'
import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {
    const click = (e) => {
        console.log(e);
    }

    return <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'close' : 'Add'} onClick={onAdd} />
    </header>;
};

Header.defaultProps = {
    title: 'Task Teacker'
}
Header.prototype = {
    title: PropTypes.string
}

export default Header;
