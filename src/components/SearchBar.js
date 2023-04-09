/* eslint-disable array-callback-return */
import React from "react";
import styled from "styled-components";
import Input from "./Input";
import CustomDropdown from "./Dropdown";
import { Divider } from "primereact/divider";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import CustomCalendar from "./CustomCalendar";
import { formatDate } from "../utils/dateFormat";

const Container = styled.div.attrs({
  className: "flex align-items-center justify-content-center flex-wrap mt-5",
})`
  gap: 25px;
`;

function SearchBar({ items, handleSearch, header, button }) {

  const getValues = () => {
    let values = {};

    items.forEach((i) => {
      if (i.component === "calendar") {
        if (i.selectionMode === "range") {
          i.names.forEach((field, index) => {
            values[field] = "";
          });
        } else {
          values[i.name] = "";
        }
      } else {
        values[i.name] = "";
      }
    });

    return values;
  };

  const formik = useFormik({
    initialValues: getValues(),
    onSubmit: async (data) => {
      const payload = {};
      await Object.keys(data).forEach((key) => {
        if (typeof data[key] === "object") {
          if (!data[key]) {
            return payload[key] === "";
          }
          payload[key] = formatDate(data[key]);
        } else {
          payload[key] = data[key];
        }
      });
      await handleSearch(payload);
    },
  });

  const handleReset = async () => {
    await formik.resetForm();
    await formik.handleSubmit();
  };

  const handleChangeCalendar = (e, item) => {
    if (item.names) {
      item.names.forEach((i, index) => {
        formik.setFieldValue(i, e.value[index]);
      });
    } else {
      formik.setFieldValue(item.name, e.value);
    }
  };

  const setValue = (item) => {
    if (item.names) {
      const formatValue = item.names.map((i) => formik.values[i]);
      if (formatValue.filter((i) => i === "").length === 2) {
        return null;
      } else {
        return formatValue;
      }
    } else {
      return formik.values[item.name];
    }
  };

  return (
    <div className="card">
      {header && (
        <>
          <h5 className="m-0">Ara</h5>
          <Divider />
        </>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Container>
          {items?.map((item, idx) => {
            switch (item.component) {
              case "input":
                return <Input key={idx} {...item} value={formik.values[item.name]} onChange={formik.handleChange} />;
              case "dropdown":
                return <CustomDropdown key={idx} {...item} value={formik.values[item.name]} onChange={formik.handleChange} />;
              case "calendar":
                return <CustomCalendar key={idx} {...item} value={setValue(item)} onChange={(event) => handleChangeCalendar(event, item)} />;
              default:
                break;
            }
          })}
        </Container>
        <div className="flex justify-content-center align-items-center mt-5" style={{ gap: "10px" }}>
          <Button type="submit" label='Ara' />
          <Button type="button" label="Sıfırla" onClick={() => handleReset()} className="p-button-raised p-button-text" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
