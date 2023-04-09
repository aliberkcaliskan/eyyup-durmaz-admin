import React from "react";
import styled from "styled-components";
import { InputTextarea } from "primereact/inputtextarea";
import classNames from "classnames";

const Wrapper = styled.div.attrs({
  className: "flex align-items-start",
})``;

function Textarea({ className, errorMsg, rows = 5, cols = 30, onChange, value, name, label, maxLength = 500, required = false, disabled }) {
  return (
    <div>
      <Wrapper className={className}>
        <span className="p-float-label w-full">
          <InputTextarea className={classNames(className, { "p-invalid": errorMsg })} id={name} name={name} value={value} onChange={(e) => onChange(e)} rows={rows} cols={cols} maxLength={maxLength} disabled={disabled} />
          {label && (
            <label htmlFor={name}>
              {errorMsg && <span className="text-pink-500">*</span>} {label}
            </label>
          )}
        </span>
      </Wrapper>
      {maxLength && (
        <div className="text-xs text-right">
          <span>{value?.length}</span>
          <span>/ {maxLength}</span>
        </div>
      )}
      {errorMsg && errorMsg}
    </div>
  );
}

export default Textarea;
