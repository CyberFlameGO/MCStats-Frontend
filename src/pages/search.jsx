import { Input, Flex, FormControl, Select } from "@chakra-ui/react";
import { RequestRenderer } from "react-rest-dom";
import Pagination from "@choc-ui/paginator";
import ServerCard from "../components/content/server-card/";
import React from "react";

function PaginationComponent({ current, total, onChange }) {
  return (
    <Flex w="full" p={50} alignItems="center" justifyContent="center">
      <Pagination
        defaultCurrent={current}
        total={total}
        paginationProps={{ display: "flex" }}
        colorScheme="yellow"
        rounded="full"
        onChange={onChange}
      />
    </Flex>
  );
}

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParam: null,
      searchInput: "",
      searchPage: 1,
      searchVersion: null,
      searchSoftware: null,
    };

    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.updateSoftware = this.updateSoftware.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.updatePage = this.updatePage.bind(this);

    this.buildURL = this.buildURL.bind(this);
  }

  updateSearchInput(e) {
    this.setState({ searchInput: e.target.value, searchParam: null });
  }

  updateVersion(e) {
    this.setState({ searchVersion: e.target.value });
  }

  updateSoftware(e) {
    this.setState({ searchSoftware: e.target.value });
  }

  updatePage(number) {
    console.log(number);
    this.setState({
      searchPage: number,
    });
    window.scrollTo(0, 0);
  }

  sendForm(e) {
    e.preventDefault();
    this.setState({ searchParam: this.state.searchInput + "" });
  }

  buildURL() {
    let url =
      "/search?motd=" +
      this.state.searchParam +
      "&page=" +
      (this.state.searchPage - 1);

    if (this.state.searchVersion != null && this.state.searchVersion !== "") {
      url += "&version=" + this.state.searchVersion;
    }

    if (this.state.searchSoftware != null && this.state.searchSoftware !== "") {
      url += "&software=" + this.state.searchSoftware;
    }

    return url;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendForm}>
          <Flex>
            <FormControl mr={4}>
              <Input
                placeholder="Search by MoTD"
                onChange={this.updateSearchInput}
                value={this.state.searchInput}
                maxLength={64}
                width="250px"
              />
            </FormControl>

            <RequestRenderer
              path="/lists"
              static={true}
              onData={({ data }) => (
                <React.Fragment>
                  <FormControl mr={4}>
                    <Select
                      placeholder="All versions"
                      onChange={this.updateVersion}
                    >
                      {data.versions.map((value, key) => (
                        <option value={value} key={key}>
                          {value}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl mr={4}>
                    <Select
                      placeholder="All software"
                      onChange={this.updateSoftware}
                    >
                      {data.softwares.map((value, key) => (
                        <option value={value} key={key}>
                          {value}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </React.Fragment>
              )}
            />
          </Flex>
        </form>

        {this.state.searchParam && (
          <RequestRenderer
            path={this.buildURL()}
            onData={({ data }) => (
              <React.Fragment>
                <PaginationComponent
                  current={this.state.searchPage}
                  total={data.total}
                  onChange={this.updatePage}
                />
                {data.servers.map((obj, index) => {
                  return <ServerCard server={obj} key={index} />;
                })}
                <PaginationComponent
                  current={this.state.searchPage}
                  total={data.total}
                  onChange={this.updatePage}
                />
              </React.Fragment>
            )}
          />
        )}
      </div>
    );
  }
}
