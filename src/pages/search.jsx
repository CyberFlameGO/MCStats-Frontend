import { Input, Flex, FormControl } from "@chakra-ui/react";
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
    };

    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  updateSearchInput(e) {
    this.setState({ searchInput: e.target.value, searchParam: null });
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

  render() {
    return (
      <div>
        <form onSubmit={this.sendForm}>
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Search by address or MoTD"
              onChange={this.updateSearchInput}
              value={this.state.searchInput}
              minLength={3}
              maxLength={64}
              width="250px"
            />
          </FormControl>
        </form>

        {this.state.searchParam && (
          <RequestRenderer
            path={
              "/search?q=" +
              this.state.searchParam +
              "&page=" +
              (this.state.searchPage - 1)
            }
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
