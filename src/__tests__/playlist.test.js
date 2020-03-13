import React from "react";
import { mount } from "enzyme";

const FakeCategoryPlaylist = props => {
  const playlists = props.location.state?.playlists;

  const handleCategoryPlaylist = () => {
    return true;
  };

  return (
    <div data-testid="categories-container">
      {playlists && (
        <div>
          {playlists.map(playlist => (
            <div
              key={playlist.id}
              onClick={() => handleCategoryPlaylist()}
              data-testid={playlist.images[0].url}
            >
              <h3>{playlist.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

describe("<CategoryPlaylist />", () => {
  const location = {
    state: {
      playlists: [{ id: "123", name: "Test", images: [{ url: "test_image" }] }]
    }
  };
  const wrapper = mount(<FakeCategoryPlaylist location={location} />);

  it("find <div /> with data-testid", () => {
    expect(wrapper.find("div").findWhere(d => d.prop("data-testid") === 1));
  });

  it("check playlist name", () => {
    expect(
      wrapper
        .find("h3")
        .render()
        .text()
    ).toEqual("Test");
  });

  it("Test click event", () => {
    const wrapper = mount(<FakeCategoryPlaylist location={location} />);
    expect(
      wrapper
        .find("div")
        .at(2)
        .simulate("click", true)
    );
  });
});
