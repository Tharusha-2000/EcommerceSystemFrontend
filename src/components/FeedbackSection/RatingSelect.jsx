
import "./Style.css";
import PropTypes from "prop-types";

const RatingSelect = ({ select, selected }) => {
  const handleChange = (e) => {
    console.log("Handle change called with value:", e.currentTarget.value);
    select(+e.currentTarget.value);
  };

  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            className="rating-input"
            type="radio"
            id={`num${i + 1}`}
            name="rating"
            value={(i + 1).toString()}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  );
};

RatingSelect.propTypes = {
  select: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};

export default RatingSelect;