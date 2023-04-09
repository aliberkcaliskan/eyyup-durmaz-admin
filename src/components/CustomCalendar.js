import React, { useContext, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import media from "../utils/media";
import styled from "styled-components/macro";
import classNames from "classnames";
import { AppContext } from "../context/AppContext";
const Container = styled.div`


  .p-calendar {
    min-width: ${(p) => p.minWidth};

    ${media.xs`
      min-width: 100%
    `}
  }
`;

function CustomCalendar(props) {
  const { theme } = useContext(AppContext);

  useEffect(() => {
  }, [theme]);
  const { minWidth = "250px", name, label, onChange, value, selectionMode, className, errorMsg, disabled } = props;
  return (
    <Container minWidth={minWidth}>
      <span className="p-float-label">
        <Calendar {...props} id={name} value={value} onChange={onChange} dateFormat="dd/mm/yy" selectionMode={selectionMode} className={classNames(className, { "p-invalid": errorMsg }, { "dark": theme === "dark" })} disabled={disabled} />
        <label htmlFor={name}>
          {errorMsg && <span className="text-pink-500">*</span>}
          {label}
        </label>
      </span>
      {errorMsg && errorMsg}
    </Container>
  );
}

export default CustomCalendar;
