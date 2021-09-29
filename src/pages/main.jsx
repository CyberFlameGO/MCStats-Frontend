import CardDeck from "../components/content/card-deck";
import CardLink from "../components/content/card-link";
import ServiceCard from "../components/content/service-card";

import { RequestRenderer } from "react-rest-dom";

export default function Main({ setSidebarContent }) {
  return (
    <div>
      <RequestRenderer
        path="/stats"
        onData={({ data }) => (
          <CardDeck>
            <ServiceCard
              color="1"
              title="Servers indexed"
              value={data.serversTotal}
            />
            <ServiceCard
              color="2"
              title="Servers online"
              value={data.serversOnline}
            />
            <ServiceCard
              color="3"
              title="Players online"
              value={data.players}
            />
            <ServiceCard
              color="4"
              title="Addresess scanned"
              value={data.addresses}
            />
          </CardDeck>
        )}
      />

      <CardDeck
        title="Most used proxies"
        description="Proxies are generally used to bundle, distribute the load of a Minecraft server, divide it into sub servers, or have DDoS protection (Like TCPShield)"
      >
        <RequestRenderer
          path="/proxies"
          onData={({ data }) =>
            data.map((item, index) => {
              return (
                <CardLink
                  key={"proxy-" + index}
                  title={item.name}
                  description={item.count + " servers"}
                  url="/"
                  icon={
                    <img
                      src={"/branding/" + item.name + ".png"}
                      alt={item.name + " icon"}
                    />
                  }
                />
              );
            })
          }
        />
      </CardDeck>

      <CardDeck
        title="Most used server software"
        description="Software used to host Minecraft servers (not counting proxies) also known as standalone servers."
      >
        <RequestRenderer
          path="/standalone"
          onData={({ data }) =>
            data.map((item, index) => {
              return (
                <CardLink
                  key={"standalone-" + index}
                  title={item.name}
                  description={item.count + " servers"}
                  url="/"
                  icon={
                    <img
                      src={"/branding/" + item.name + ".png"}
                      alt={item.name + " icon"}
                    />
                  }
                />
              );
            })
          }
        />
      </CardDeck>

      <CardDeck
        title="Most used versions"
        description="Most used version to host Minecraft servers (not counting proxies nor multi-version servers)"
      >
        <RequestRenderer
          path="/versions"
          onData={({ data }) =>
            data.map((item, index) => {
              return (
                <CardLink
                  key={"version-" + index}
                  title={item.name}
                  description={item.count + " servers"}
                  url="/"
                  icon={
                    <img src={"/branding/vanilla.png"} alt={"minecraft icon"} />
                  }
                />
              );
            })
          }
        />
      </CardDeck>
    </div>
  );
}
