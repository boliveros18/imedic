import { FC, useContext } from "react";
import * as React from "react";
import {
  Typography
} from "@mui/material";
import { SingInUi, CardDetailUi, ReadMore, SeeComments } from "../ui";
import { UseWindowSize } from "../../utils";
import { ClinicContext } from "../../context/clinic";
import { AuthContext } from "../../context/auth";
import { UIContext } from "../../context/ui";
import LoadingUi from "../ui/utils/LoadingUi";
import { LargeItemCard } from "../ui/utils/LargeItemCard";

interface Props {}

export const HomeCard: FC<Props> = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const mobile = UseWindowSize();
  const { principal } = useContext(ClinicContext);
  const { loading } = useContext(UIContext);

  return (
    <>
      <SeeComments
        parent_id={principal?._id || ""}
        type={principal.type}
        initialAnswers={principal.comments}
      >
        <LoadingUi/>
        <LargeItemCard item={principal} route={true}> 
        {loading && (
            <div style={{ marginLeft: "17px" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "#001B87",
                  mt: 1.5,
                  mb: 1,
                }}
              >
                Finantial, Specialty & Technology
              </Typography>
              <CardDetailUi
                author=""
                comment={
                  mobile ? (
                    <ReadMore
                      text={
                        principal?.finantial +
                        ". " +
                        principal?.category +
                        ". " +
                        principal?.technology
                      }
                    />
                  ) : (
                    principal?.finantial +
                    ". " +
                    principal?.category +
                    ". " +
                    principal?.technology
                  )
                }
                info={true && !isLoggedIn}
              ></CardDetailUi>
            </div>
          )}
        </LargeItemCard>
      </SeeComments>
      <SingInUi />
    </>
  );
};
