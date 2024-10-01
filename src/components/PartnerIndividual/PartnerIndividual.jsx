import { React, useState } from "react";

//img
import Google from "../../img/partners/google.svg";
import Partner from "../../img/partners/partner.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// MUI
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EastIcon from "@mui/icons-material/East";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: "rotate(0deg)",
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: "rotate(180deg)",
            },
        },
    ],
}));

export default function PartnerIndividual() {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ minWidth: 280, pl: 2, pr: 2 }}>
            <CardHeader
                title="Our beloved partner"
                avatar={<Avatar src={Partner} alt="Partner" />}
                sx={{ width: 200 }}
            />
            <CardMedia image={Google} sx={{ height: 160 }} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Google
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", width: 200 }}
                >
                    They have inspired us to become better at what our platform
                    provides
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Projects"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography color="success">Our projects:</Typography>

                    <List>
                        <ListItem disablePadding sx={{ width: 200 }}>
                            <ListItemIcon>
                                <EastIcon />
                            </ListItemIcon>
                            <ListItemText primary="Website Redesign and Development" />
                        </ListItem>
                        <ListItem disablePadding sx={{ width: 200 }}>
                            <ListItemIcon>
                                <EastIcon />
                            </ListItemIcon>
                            <ListItemText primary="Digital Marketing Campaign" />
                        </ListItem>
                        <ListItem disablePadding sx={{ width: 200 }}>
                            <ListItemIcon>
                                <EastIcon />
                            </ListItemIcon>
                            <ListItemText primary="Website Redesign and Development" />
                        </ListItem>
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
}
