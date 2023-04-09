import React from "react";
import { Dropdown } from "primereact/dropdown";
import styled from "styled-components";
import media from "../utils/media";
import classNames from "classnames";

const Container = styled.div`
  .p-dropdown {
    min-width: ${(p) => p.minWidth};

    ${media.xs`
      min-width: 200px
    `}
  }
`;

function CustomDropdown({ minWidth = "250px", name, label, options, onChange, value, className, errorMsg, optionLabel, optionValue, disabled }) {
  const labelStyle = {
    top: (value || value === 0 || typeof value === "boolean") && "-.75rem",
    fontSize: (value || value === 0 || typeof value === "boolean") && "12px",
  };

  return (
    <Container minWidth={minWidth}>
      <span className="p-float-label">
        <Dropdown className={classNames(className, { "p-invalid": errorMsg })} name={name} inputId={name} options={options} value={value} onChange={onChange} optionLabel={optionLabel} optionValue={optionValue} disabled={disabled} autoComplete="false" ariaLabel="tes" />
        <label style={labelStyle} htmlFor={name}>
        {errorMsg && <span className="text-pink-500">*</span>}
          {label}
        </label>
      </span>
      {errorMsg && errorMsg}
    </Container>
  );
}

export default CustomDropdown;
