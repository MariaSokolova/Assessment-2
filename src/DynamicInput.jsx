import React, { useEffect, useState } from "react";

export default function DynamicInput() {
  const [formInputs, setFormInputs] = useState([]);
  const [focusIndex, setFocusIndex] = useState(-1);

  useEffect(() => {
    if (formInputs.length && focusIndex !== -1) {
      formInputs[focusIndex].inputRef.focus();
    }
  }, [formInputs, focusIndex]);

  const handleAddRow = () => {
    setFormInputs([...formInputs, {name: '', inputRef: null}]);
    setFocusIndex(formInputs.length);
  };

  const handleChange = (e, index) => {
    const inputs = [...formInputs];
    inputs[index].name = e.target.value;
    setFocusIndex(index);
    setFormInputs(inputs);
  };

  const handleInputUp = (index) => {
    const inputs = [...formInputs];
    if (index === 0) {
      setFocusIndex(0);
      setFormInputs(inputs);
      return;
    }

    const currInput = inputs[index];
    const prevInput = inputs[index - 1];
    inputs[index - 1] = currInput;
    inputs[index] = prevInput;

    setFocusIndex(index - 1);
    setFormInputs(inputs);
  };

  const handleInputDown = (index) => {
    const inputs = [...formInputs];
    if (index === formInputs.length - 1) {
      setFocusIndex(formInputs.length - 1);
      setFormInputs(inputs);
      return;
    }

    const currInput = inputs[index];
    const nextInput = inputs[index + 1];
    inputs[index + 1] = currInput;
    inputs[index] = nextInput;

    setFocusIndex(index + 1);
    setFormInputs(inputs);
  };

  const handleInputDelete = (index) => {
    const inputs = [...formInputs];
    inputs.splice(index, 1);
    setFormInputs(inputs);
    if (index === inputs.length){
      setFocusIndex(index - 1);
    } else {
      setFocusIndex(index);
    }
  };

  return (
    <>
      <button
        className="add-row"
        onClick={handleAddRow}
      >
        +
      </button>
      {formInputs.map((input, index) => (
        <div key={index}>
          <input
            className="row-input"
            value={input.name}
            ref={e => input.inputRef = e}
            onChange={(e) => handleChange(e, index)}
          />
          <button
            className="row-up"
            onClick={() => handleInputUp(index)}> &uarr;</button>
          <button
            className="row-down"
            onClick={() => handleInputDown(index)}> &darr;</button>
          <button
            className="row-delete"
            onClick={() => handleInputDelete(index)}>	&times;</button>
        </div>
      ))}
    </>
  );
}
