import { Divider } from "primereact/divider";
import React from "react";
import styled from "styled-components/macro";
import media from "../utils/media";

const TableContainer = styled.table`
  border-spacing: 2rem;

  .value {
    word-break: break-all;
  }

  ${media.xs`
    border-spacing: 0.5rem;
  `}
`;

function Table({ header, data, className = "" }) {
  return (
    <div className="card">
      {header && (
        <>
          <h5>{header}</h5>
          <Divider />
        </>
      )}
      <TableContainer className={className}>
        <tbody>
          {data.map((item, idx) => {
            return (
              <tr key={idx}>
                <td className="text-right">{item.name}:</td>
                <td className="value">{item.type === "html" ? <div dangerouslySetInnerHTML={{ __html: item.value }} /> : item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </TableContainer>
    </div>
  );
}

export default Table;
