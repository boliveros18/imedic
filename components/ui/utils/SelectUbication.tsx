import { FC, ReactNode, useState, useContext, useEffect } from "react";
import { MenuItem, SelectChangeEvent, Grid } from "@mui/material";
import { UIContext } from "../../../context/ui";
import { Country, State, City } from "country-state-city";
import SelectUbicationUi from "./SelectUbicationUi";
import { Clinic } from "../../../interfaces";

interface Props {
  children?: ReactNode;
  content: Clinic;
}

export const SelectUbication: FC<Props> = ({ content }) => {
  const { setCountry, setState, setCity } = useContext(UIContext);
  const [country, addCountry] = useState("");
  const [state, addState] = useState("");
  const [city, addCity] = useState("");

   useEffect(() => {
      setCountry(content.country);
      setState(content.state);
      setCity(content.province);
      addCountry("");
      addState("");
      addCity("");
  }, [setCountry, setState, setCity, content]);

  const handleChangeCountry = (event: SelectChangeEvent) => {
    addCountry(event.target.value as string);
  };
  const handleChangeState = (event: SelectChangeEvent) => {
    addState(event.target.value as string);
  };
  const handleChangeCity = (event: SelectChangeEvent) => {
    addCity(event.target.value as string);
  };

  return (
    <Grid container spacing={0} rowSpacing={2}>
      <SelectUbicationUi
        ubication={country}
        handleChange={handleChangeCountry}
        type={content?.country === "" ? "Country" : content?.country}
      >
        {Country.getAllCountries().map((item, index) => (
          <MenuItem
            key={index}
            value={item.isoCode || ""}
            onClick={() => setCountry(item.name)}
          >
            <span style={{ fontWeight: "500" }}>{item.name}</span>
          </MenuItem>
        ))}
      </SelectUbicationUi>
      <SelectUbicationUi
        ubication={state}
        handleChange={handleChangeState}
        type={content?.state === "" ? "State" : content?.state}
      >
        {State.getStatesOfCountry(country).map((item, index) => (
          <MenuItem
            key={index}
            value={item.isoCode || ""}
            onClick={() => setState(item.name)}
          >
            <span style={{ fontWeight: "500" }}>{item.name}</span>
          </MenuItem>
        ))}
      </SelectUbicationUi>
      <SelectUbicationUi
        ubication={city}
        handleChange={handleChangeCity}
        type={content?.province === "" ? "City" : content?.province}
      >
        {City.getCitiesOfState(country, state).map((item, index) => (
          <MenuItem
            key={index}
            value={item.name || ""}
            onClick={() => setCity(item.name)}
          >
            <span style={{ fontWeight: "500" }}>{item.name}</span>
          </MenuItem>
        ))}
      </SelectUbicationUi>
    </Grid>
  );
};

export default SelectUbication;
