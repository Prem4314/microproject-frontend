import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Link,
} from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import defaultAlumniImage from "../Images/Alumni.jpg"; // Import default alumni image
import defaultEventsImage from "..//Images/EventImage.jpg"; // Import default events image

const HomePage = ({ userType, userName, onLogout }) => {
  return (
    <div>
      <ResponsiveAppBar
        userType={userType}
        userName={userName}
        onLogout={onLogout}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={defaultAlumniImage}
                alt="Alumni Network"
                sx={{ height: 250 }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Welcome to the Alumni Tracking System
                </Typography>
                <Typography variant="body1" paragraph>
                  Stay connected with your fellow alumni, discover career
                  opportunities, and give back to your alma mater.
                </Typography>
                {userType !== "alumni" && (
                  <CardActions>
                    <Link underline="none" href="/alumni-registration">
                      <Button variant="contained">
                        Join as Alumni & Explore More
                      </Button>
                    </Link>
                  </CardActions>
                )}
                {userType === "alumni" && (
                  <CardActions>
                    <Button variant="contained" href="/alumni-directory">
                      Find Alumni
                    </Button>
                  </CardActions>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={defaultEventsImage}
                alt="Upcoming Events"
                sx={{ height: 250 }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Upcoming Events
                </Typography>
                <Typography variant="body1" paragraph>
                  Join us for reunions, workshops, and networking events. Stay
                  updated on the latest happenings!
                </Typography>
                <CardActions>
                  <Button variant="contained" href="/events">
                    See Events
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
