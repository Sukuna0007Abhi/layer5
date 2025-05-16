import React, { useState } from "react";
import { MeetupStyle } from "./meetups.style";
import Card from "../../components/Card";
import { Col, Container, Row } from "../../reusecore/Layout";
import Pager from "../../components/pager";
import UpcomingEvents from "../../components/UpcomingEventCard";
import PageHeader from "../../reusecore/PageHeader";
import Button from "../../reusecore/Button";
import RssFeedIcon from "../../assets/images/socialIcons/rss-sign.svg";

const Meetups = ({ data, pageContext }) => {
  const [active, setActive] = useState("all");

  const sortEvents = (nodes) => {
    return nodes ? nodes.slice().sort((first, second) =>
      new Date(second.frontmatter.date.replace(/(st|nd|rd|th),/g, "")) -
      new Date(first.frontmatter.date.replace(/(st|nd|rd|th),/g, ""))) : [];
  };

  const getFilteredEvents = () => {
    switch (active) {
      case "events":
        return sortEvents(data.allEvents.nodes);
      case "workshops":
        return sortEvents(data.allWorkshops.nodes);
      case "meetups":
        return sortEvents(data.allMeetups.nodes);
      case "all":
      default:
        return sortEvents(data.allCategories.nodes);
    }
  };

  const filteredEvents = getFilteredEvents();
  const showPagination = active === "all";

  return (
    <MeetupStyle>
      <PageHeader title="Events" path="Community/Events" img={RssFeedIcon} feedlink="/events/feed.xml" />
      <h2 className="event-subhead">Join Layer5 at these events</h2>
      <UpcomingEvents data={data.allUpcoming} />
      <Container>
        <div className="filterBtns">
          <Button className={active === "all" ? "active" : ""} onClick={() => setActive("all")} title="All" />
          <Button className={active === "events" ? "active" : ""} onClick={() => setActive("events")} title="Events" />
          <Button className={active === "workshops" ? "active" : ""} onClick={() => setActive("workshops")} title="Workshops" />
          <Button className={active === "meetups" ? "active" : ""} onClick={() => setActive("meetups")} title="MeetUps" />
        </div>
        <div>
          <Row style={{ flexWrap: "wrap" }}>
            {filteredEvents.map(item => (
              <Col $xs={12} $sm={6} $lg={4} key={item.id}>
                <Card frontmatter={item.frontmatter} fields={item.fields} />
              </Col>
            ))}
          </Row>
        </div>
        {showPagination && <Pager pageContext={pageContext} text={"Events"} />}
      </Container>
    </MeetupStyle>
  );
};

export default Meetups;
