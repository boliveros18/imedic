import { FC, useState, useEffect, useContext } from "react";
import { Typography, Box, Grid, IconButton } from "@mui/material";
import { AuthContext } from "../../../context/auth";
import { QualificationContext } from "../../../context/qualification";
import { ClinicContext } from "../../../context/clinic";
import StarIcon from "@mui/icons-material/Star";
import { Qualification } from "../../../interfaces";

interface Props {
  qualifications: Qualification[];
  Qualification: number;
  type: string;
}

export const ItemQualification: FC<Props> = ({
  qualifications,
  Qualification,
  type,
}) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { updateClinic, clinic } = useContext(ClinicContext);
  const { updateQualification, createQualification, qualification } =
    useContext(QualificationContext);
  const [average, setAverage] = useState(Qualification);
  const [currentValue, setCurrentValue] = useState(0);
  useEffect(() => {
    setCurrentValue(Math.round(average));
  }, [average]);

  const [hoverValue, setHoverValue] = useState(0);
  const stars = Array(5).fill(0);

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const updateSelector = (
    type: string,
    parent_id: string,
    newAverage: number
  ) => {
    switch (type) {
      case "clinic":
        return updateClinic(parent_id, {
          ...clinic,
          ["qualification"]: newAverage,
        });
      default:
        return;
    }
  };

  const updateItem = (qualifications: Qualification[]) => {
    const newAverage: number =
      qualifications
        .map((item) => item.stars)
        .reduce((previous, current) => previous + current) /
      qualifications.length;
    updateSelector(type, qualifications[0].parent_id, newAverage);
    setAverage(newAverage);
  };

  const starsClick = (value: number) => {
    if (isLoggedIn) {
      const index = qualifications.findIndex((i) => i.user_id === user?._id);
      if (index > -1) {
        qualifications[index].stars = value;
        updateItem(qualifications);
        if (qualification.stars > -1) {
          updateQualification(qualification._id || "", qualifications[index]);
        } else {
          updateQualification(
            qualifications[index]._id || "",
            qualifications[index]
          );
        }
      } else {
        const query = {
          parent_id: qualifications[0].parent_id,
          user_id: user?._id || "",
          user_name: user?.name || "",
          stars: value,
        };
        createQualification(query);
        qualifications.push(query);
        updateItem(qualifications);
      }
    }
  };

  return (
    <>
      <Box>
        {stars.map((_, item) => (
          <IconButton
            size="large"
            key={item}
            onClick={() => starsClick(item + 1)}
            onMouseOver={() => handleMouseOver(item + 1)}
            onMouseLeave={handleMouseLeave}
            sx={{
              mr: -3,
              mt: -3,
              mb: -2,
              color:
                hoverValue > item || currentValue > item
                  ? "#FFBA5A"
                  : "#a9a9a9",
            }}
          >
            <StarIcon />
          </IconButton>
        ))}
      </Box>
      <Grid container spacing={1}>
        <Box sx={{ flexGrow: 1 }} />
        <Grid item>
          <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
            {average > 3 ? "Excellent(" : "Good("}
            {qualifications.length + " qualifications) | "}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              width: 35,
              height: 20,
              borderRadius: "3px",
              backgroundColor: "green",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: "white",
                fontWeight: "500",
                ml: "5px",
              }}
            >
              {average}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
