/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import pageURL from "../utils/pageUrls";
import ActionButtons from "../components/ActionButtons";

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  .card {
    cursor: pointer;
    span {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
  }
`;
const portalData = [
  { title: "Klinikler", icon: "pi-building", pageURL: pageURL.clinics },
  { title: "Odalar", icon: " pi-box", pageURL: pageURL.rooms },
  { title: "Randevular", icon: "pi-calendar", pageURL: pageURL.reservations },
  { title: "Kullanıcılar", icon: "pi-user", pageURL: pageURL.users },
];

export default function Home() {
  const { push } = useHistory();

  const cardListRender = (portalData) => {
    return portalData.map((portal, i) => {
      return (
        <ActionButtons customStyle="w-50" key={i}>
          <div className="card flex flex-column align-items-center" onClick={() => push(`${portal.pageURL}`)} >
            <i className={`${portal.icon} pi flex justify-content-center mt-3 mb-2`} style={{ fontSize: "3em" }} />
            <span>{portal.title}</span>
          </div>
        </ActionButtons>
      );
    });
  };

  return (
    <div className="grid">
      <div className="col-12">
        <CardList>{cardListRender(portalData)}</CardList>
      </div>
    </div>
  );
}
