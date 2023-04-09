import React from "react";
import pageURL from "./utils/pageUrls";

const Home = React.lazy(() => import("./pages/Home"));
const Clinics = React.lazy(() => import("./pages/Clinics"));
const ClinicsAction = React.lazy(() => import("./pages/Clinics/Action"));

const Rooms = React.lazy(() => import("./pages/Rooms"));
const RoomsAction = React.lazy(() => import("./pages/Rooms/Action"));


const routes = [
  { path: pageURL.home, exact: true, name: "Anasayfa", component: Home },
  { path: pageURL.clinics, exact: true, name: "Klinikler", component: Clinics },
  { path: pageURL.clinicAction, exact: true, name: "Klinik", component: ClinicsAction },
  { path: pageURL.rooms, exact: true, name: "Odalar", component: Rooms },
  { path: pageURL.roomsAction, exact: true, name: "Oda", component: RoomsAction },
];

export default routes;
