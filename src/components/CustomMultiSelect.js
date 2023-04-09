import React from "react";
import styled from "styled-components/macro";
import media from "../utils/media";
import { MultiSelect } from "primereact/multiselect";
import classNames from "classnames";

const Container = styled.div`
  .p-dropdown {
    min-width: ${(p) => p.minWidth};

    ${media.xs`
      min-width: 200px
    `}
  }
`;

function CustomMultiSelect({ minWidth = "250px", name, label, options, onChange, value, className, errorMsg, optionLabel, optionValue, disabled }) {
  return (
    <Container minWidth={minWidth}>
      <span className="p-float-label">
        <MultiSelect name={name} disabled={disabled} label={label} display="chip" className={classNames(className, { "p-invalid": errorMsg })} maxSelectedLabels={3} optionValue={optionValue} optionLabel={optionLabel} value={value} options={options} onChange={onChange} />
        <label htmlFor={name}>
          {errorMsg && <span className="text-pink-500">*</span>}
          {label}
        </label>
      </span>
      {errorMsg && errorMsg}
    </Container>
  );
}

export default CustomMultiSelect;
