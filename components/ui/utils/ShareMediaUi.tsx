import { FC, ReactNode, useState, MouseEvent } from "react";
import { Popover, IconButton, Grid } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import { LINK_PAGE, hashtag } from "../../../definitions";

interface Props {
  children?: ReactNode;
  name: string;
  description: string;
}

export const ShareMediaUi: FC<Props> = ({ name, description }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-label="settings"
        style={{
          color: "black",
        }}
        onClick={handleClick}
      >
        <ShareIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Grid container>
          <Grid item sx={{ m: 1 }}>
            <FacebookShareButton
              url={LINK_PAGE}
              quote={name + ": " + description}
              hashtag={hashtag}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <FacebookMessengerShareButton url={LINK_PAGE} appId={""}>
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <WhatsappShareButton
              url={LINK_PAGE}
              title={name + ": " + description}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <TwitterShareButton
              url={LINK_PAGE}
              title={name + ": " + description}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Grid>
          <Grid item sx={{ m: 1 }}>
            <EmailShareButton url={LINK_PAGE} subject={name} body={description}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};
